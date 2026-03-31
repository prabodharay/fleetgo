import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const releaseEscrow = onDocumentUpdated(
  "bookings/{bookingId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) return;

    // Prevent duplicate execution
    if (before.deliveryConfirmed === true) return;
    if (after.deliveryConfirmed !== true) return;

    if (after.status !== "completed") return;
    if (after.isSettled !== true) return;

    const bookingId = event.params.bookingId;

    await db.runTransaction(async (transaction) => {
      const bookingRef = db.collection("bookings").doc(bookingId);
      const bookingSnap = await transaction.get(bookingRef);
      const booking = bookingSnap.data();

      if (!booking) return;

      const driverId = booking.driverId;
      const driverShare = booking.driverEscrowAmount;

      if (!driverId || !driverShare) return;

      const walletRef = db.collection("wallets").doc(driverId);

      transaction.update(walletRef, {
        escrowBalance:
          admin.firestore.FieldValue.increment(-driverShare),
        availableBalance:
          admin.firestore.FieldValue.increment(driverShare),
      });

      // Audit log
      const logRef = db.collection("audit_logs").doc();

      transaction.set(logRef, {
        type: "ESCROW_RELEASE",
        bookingId,
        driverId,
        amount: driverShare,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });
  }
);
