import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const refundProcessor = onDocumentUpdated(
  "refund_requests/{refundId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    if (before.status === "approved") return;
    if (after.status !== "approved") return;

    const refund = after;

    const bookingRef = db.collection("bookings").doc(refund.bookingId);
    const walletRef = db.collection("wallets").doc(refund.customerId);

    await db.runTransaction(async (transaction) => {
      transaction.update(walletRef, {
        availableBalance:
          admin.firestore.FieldValue.increment(refund.amount),
      });

      transaction.update(bookingRef, {
        refundIssued: true,
      });

      transaction.update(event.data!.after.ref, {
        status: "refunded",
        refundedAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });

      const logRef = db.collection("audit_logs").doc();

      transaction.set(logRef, {
        type: "REFUND",
        bookingId: refund.bookingId,
        amount: refund.amount,
        createdAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });
    });
  }
);
