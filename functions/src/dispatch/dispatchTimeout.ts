import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const dispatchTimeout = onSchedule(
  {
    schedule: "every 1 minutes",
    region: "us-central1",
  },
  async () => {

    const now = admin.firestore.Timestamp.now();

    const snapshot = await db
      .collection("bookings")
      .where("status", "==", "waiting_driver_response")
      .where("dispatchExpiresAt", "<=", now)
      .limit(50)
      .get();

    if (snapshot.empty) return;

    for (const doc of snapshot.docs) {

      const booking = doc.data();
      const bookingRef = doc.ref;

      const driverId = booking.notifiedDriver;

      await db.runTransaction(async (transaction) => {

        const freshSnap = await transaction.get(bookingRef);
        const freshData = freshSnap.data();

        if (!freshData) return;

        if (freshData.status !== "waiting_driver_response") return;

        if (driverId) {

          const driverRef = db.collection("drivers").doc(driverId);

          transaction.update(driverRef, {
            incomingBookingId: admin.firestore.FieldValue.delete(),
          });

        }

        transaction.update(bookingRef, {
          dispatchIndex: (freshData.dispatchIndex ?? 0) + 1,
          notifiedDriver: null,
        });

      });

    }

  }
);