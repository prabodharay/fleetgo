import {onSchedule} from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const escrowIntegrityChecker = onSchedule(
  "every 6 hours",
  async () => {
    const wallets = await db.collection("wallets").get();

    for (const doc of wallets.docs) {
      const data = doc.data();

      if (data.escrowBalance < 0) {
        await db.collection("alerts").add({
          type: "ESCROW_NEGATIVE",
          wallet: doc.id,
        });
      }
    }
  });
