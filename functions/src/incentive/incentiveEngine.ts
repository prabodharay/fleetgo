
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function calculateIncentive(driverId: string) {

  const trips = await db
    .collection("bookings")
    .where("driverId", "==", driverId)
    .where("status", "==", "completed")
    .get();

  const count = trips.size;

  let bonus = 0;

  if (count >= 20) bonus = 500;
  else if (count >= 10) bonus = 200;

  return bonus;
}
