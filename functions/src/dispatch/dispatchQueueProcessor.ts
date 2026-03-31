import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { dispatchNextDriver } from "./dispatchNextDriver";

const db = admin.firestore();

/*
Dispatch Queue Processor
Runs every minute to process bookings
that are waiting for drivers
*/

export const dispatchQueueProcessor = onSchedule(
{
  schedule: "* * * * *",
  timeZone: "UTC",
  region: "us-central1"
},
async () => {

  console.log("Dispatch queue processor started");

  const bookings = await db
    .collection("bookings")
    .where("status", "==", "searching_driver")
    .limit(20)
    .get();

  if (bookings.empty) {
    console.log("No bookings waiting for dispatch");
    return;
  }

  const tasks: Promise<any>[] = [];

  for (const doc of bookings.docs) {

    const bookingId = doc.id;

    console.log("Processing booking:", bookingId);

    tasks.push(dispatchNextDriver(bookingId));
  }

  await Promise.all(tasks);

  console.log("Dispatch queue finished");

});