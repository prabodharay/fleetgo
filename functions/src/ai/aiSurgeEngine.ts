
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function calculateSurge(city: string) {

  const driversSnap = await db
    .collection("drivers")
    .where("city", "==", city)
    .where("online", "==", true)
    .get();

  const bookingsSnap = await db
    .collection("bookings")
    .where("city", "==", city)
    .where("status", "==", "searching_driver")
    .get();

  const supply = driversSnap.size;
  const demand = bookingsSnap.size;

  const ratio = demand / (supply || 1);

  let surge = 1;

  if (ratio > 3) surge = 2.5;
  else if (ratio > 2) surge = 2.0;
  else if (ratio > 1.5) surge = 1.5;
  else if (ratio > 1) surge = 1.2;

  return {
    surge,
    demand,
    supply
  };
}
