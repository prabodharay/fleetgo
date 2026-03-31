import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const monthlyGstReport = onSchedule(
  "0 0 1 * *",
  async () => {
    const now = new Date();
    const previousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    const monthKey =
      previousMonth.toISOString().slice(0, 7);

    const gstWallet = await db
      .collection("wallets")
      .doc("tax_gst")
      .get();

    const gstCollected =
      gstWallet.data()?.balance ?? 0;

    await db
      .collection("gst_reports")
      .doc(monthKey)
      .set({
        month: monthKey,
        totalGstCollected: gstCollected,
        generatedAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });
  }
);
