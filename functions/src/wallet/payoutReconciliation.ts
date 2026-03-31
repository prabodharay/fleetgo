import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const payoutReconciliation = onSchedule(
  "every 6 hours",
  async () => {
    const snapshot = await db
      .collection("payout_requests")
      .where("status", "==", "paid")
      .where("reconciled", "==", false)
      .get();

    for (const doc of snapshot.docs) {
      const data = doc.data(); void data;

      // Here you would call Razorpay API to verify payout status
      // Assume verified

      await doc.ref.update({
        reconciled: true,
        reconciledAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }
);
