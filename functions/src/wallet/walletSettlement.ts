import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const walletSettlement = onSchedule(
  "every 24 hours",
  async () => {

    const trips = await db
      .collection("bookings")
      .where("status", "==", "completed")
      .get();

    const batch = db.batch();

    trips.forEach(doc => {

      const data = doc.data();
      const driverId = data.driverId;

      const walletRef = db.collection("wallets").doc(driverId);

      batch.update(walletRef, {
        balance: admin.firestore.FieldValue.increment(data.driverEarning)
      });

    });

    await batch.commit();

  }
);