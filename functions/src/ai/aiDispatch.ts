
import * as admin from "firebase-admin";
import { scoreDriver } from "./driverScoring";

const db = admin.firestore();

export async function aiDispatch(bookingId: string) {

  const bookingSnap = await db.collection("bookings").doc(bookingId).get();
  if (!bookingSnap.exists) return;

  const booking = bookingSnap.data() as any;

  const driversSnap = await db
    .collection("drivers")
    .where("city", "==", booking.city)
    .where("online", "==", true)
    .get();

  let bestDriver: any = null;
  let bestScore = -999;

  for (const doc of driversSnap.docs) {

    const driver = doc.data();

    const distance = Math.random() * 5; // replace with real distance later

    const score = scoreDriver(driver, distance);

    if (score > bestScore) {
      bestScore = score;
      bestDriver = { id: doc.id, ...driver };
    }
  }

  if (!bestDriver) {

    await db.collection("bookings").doc(bookingId).update({
      status: "no_driver_found"
    });

    return;
  }

  await db.collection("bookings").doc(bookingId).update({
    driverId: bestDriver.id,
    status: "driver_assigned"
  });
}
