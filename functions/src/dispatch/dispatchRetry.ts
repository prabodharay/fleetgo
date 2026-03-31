import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { dispatchNextDriver } from "./dispatchNextDriver";

const db = admin.firestore();

export const dispatchRetry = onSchedule(
{
  schedule: "every 2 minutes",
  region: "us-central1",
  timeZone: "UTC"
},
async () => {

  const stuckBookings = await db
    .collection("bookings")
    .where("status","==","searching_driver")
    .get();

  for (const doc of stuckBookings.docs) {

    const bookingId = doc.id;

    await dispatchNextDriver(bookingId);

  }

});