import * as admin from "firebase-admin";
import { getNearbyCells } from "./geoGrid";

const db = admin.firestore();

const DRIVER_TIMEOUT = 15000;

export async function geoDispatchEngine(bookingId: string) {

  const bookingSnap = await db.collection("bookings").doc(bookingId).get();

  if (!bookingSnap.exists) {
    console.log("Booking missing");
    return;
  }

  const booking = bookingSnap.data() as any;

  const lat = booking.pickup.lat;
  const lng = booking.pickup.lng;

  const cells = getNearbyCells(lat, lng);

  console.log("Nearby cells:", cells);

  let driverIds: string[] = [];

  for (const cell of cells) {

    const cellDoc = await db
      .collection("drivers_geo")
      .doc(cell)
      .get();

    if (!cellDoc.exists) continue;

    const drivers = cellDoc.data()?.drivers || [];

    driverIds.push(...drivers);

  }

  driverIds = [...new Set(driverIds)];

  if (driverIds.length === 0) {
    console.log("No drivers in cells");
    return;
  }

  const drivers = await fetchDrivers(driverIds);

  const sortedDrivers = sortDriversByDistance(
    lat,
    lng,
    drivers
  );

  for (const driver of sortedDrivers) {

    const accepted = await sendDispatchRequest(
      driver.id,
      bookingId
    );

    if (accepted) {

      await db.collection("bookings")
        .doc(bookingId)
        .update({
          driverId: driver.id,
          status: "driver_assigned"
        });

      return;
    }

  }

  console.log("All drivers rejected");
}

async function fetchDrivers(driverIds: string[]) {

  const drivers: any[] = [];

  for (const id of driverIds) {

    const snap = await db.collection("drivers").doc(id).get();

    if (!snap.exists) continue;

    const data = snap.data();

    if (!data?.online) continue;

    drivers.push({
      id,
      lat: data.location.lat,
      lng: data.location.lng
    });

  }

  return drivers;
}

function sortDriversByDistance(
  lat: number,
  lng: number,
  drivers: any[]
) {

  return drivers.sort((a, b) => {

    const d1 = distance(lat, lng, a.lat, a.lng);
    const d2 = distance(lat, lng, b.lat, b.lng);

    return d1 - d2;

  });

}

function distance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {

  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

async function sendDispatchRequest(
  driverId: string,
  bookingId: string
): Promise<boolean> {

  await db.collection("driver_jobs")
    .doc(driverId)
    .set({
      bookingId,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

  const start = Date.now();

  while (Date.now() - start < DRIVER_TIMEOUT) {

    const job = await db.collection("driver_jobs")
      .doc(driverId)
      .get();

    const data = job.data();

    if (!data) return false;

    if (data.status === "accepted") {
      return true;
    }

    if (data.status === "rejected") {
      return false;
    }

    await sleep(2000);

  }

  console.log("Driver timeout");

  return false;
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}