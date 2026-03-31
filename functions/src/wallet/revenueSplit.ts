import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const revenueSplit = onDocumentUpdated(
  "bookings/{bookingId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();

    if (!before || !after) return;

    // ✅ IDEMPOTENCY GUARDS
    if (before.status === "paid") return;
    if (after.status !== "paid") return;
    if (after.isSettled === true) return;
    if (after.processing === true) return;

    const bookingId = event.params.bookingId;

    await db.runTransaction(async (transaction) => {
      const bookingRef = db.collection("bookings").doc(bookingId);
      const bookingSnap = await transaction.get(bookingRef);
      const booking = bookingSnap.data();

      if (!booking) return;

      // 🔒 Processing lock
      transaction.update(bookingRef, {
        processing: true,
      });

      const totalFare = booking.fare;
      const driverId = booking.driverId;
      const fleetOwnerId = booking.fleetOwnerId;

      if (!driverId) return;

      // PLATFORM CONFIG
      const configSnap = await transaction.get(
        db.collection("settings").doc("platform_config")
      );

      const taxSnap = await transaction.get(
        db.collection("settings").doc("platform_tax_config")
      );

      const config = configSnap.data();
      const tax = taxSnap.data();

      const platformPercent =
        config?.platformCommissionPercent ?? 20;

      const defaultOwnerPercent =
        config?.defaultOwnerCommissionPercent ?? 10;

      const taxRuleSnap = await transaction.get(
        db.collection("tax_rules").doc(booking.state)
      );

      const gstPercent =
        taxRuleSnap.data()?.gstPercent ?? 18;

      const tdsPercent = tax?.tdsPercent ?? 1;

      const platformCommission =
        (totalFare * platformPercent) / 100;

      const gstAmount =
        (platformCommission * gstPercent) / 100;

      let remaining = totalFare - platformCommission;

      const tdsAmount =
        (remaining * tdsPercent) / 100;

      remaining -= tdsAmount;

      // DRIVER OVERRIDE OWNER %
      let ownerPercent = defaultOwnerPercent;

      const driverSnap = await transaction.get(
        db.collection("drivers").doc(driverId)
      );

      if (driverSnap.data()?.ownerCommissionPercent) {
        ownerPercent =
          driverSnap.data()?.ownerCommissionPercent;
      }

      let ownerShare = 0;
      let driverShare = remaining;

      if (fleetOwnerId) {
        ownerShare =
          (totalFare * ownerPercent) / 100;

        driverShare = remaining - ownerShare;
      }

      // WALLET REFERENCES
      const driverWallet =
        db.collection("wallets").doc(driverId);

      const ownerWallet = fleetOwnerId ?
        db.collection("wallets").doc(fleetOwnerId) :
        null;

      const platformWallet =
        db.collection("wallets").doc("platform");

      const gstWallet =
        db.collection("wallets").doc("tax_gst");

      const tdsWallet =
        db.collection("wallets").doc("tax_tds");

      // ESCROW CREDIT
      transaction.update(driverWallet, {
        escrowBalance:
          admin.firestore.FieldValue.increment(
            driverShare
          ),
      });

      if (ownerWallet) {
        transaction.update(ownerWallet, {
          escrowBalance:
            admin.firestore.FieldValue.increment(
              ownerShare
            ),
        });
      }

      transaction.update(platformWallet, {
        balance:
          admin.firestore.FieldValue.increment(
            platformCommission - gstAmount
          ),
      });

      transaction.update(gstWallet, {
        balance:
          admin.firestore.FieldValue.increment(
            gstAmount
          ),
      });

      transaction.update(tdsWallet, {
        balance:
          admin.firestore.FieldValue.increment(
            tdsAmount
          ),
      });

      // 📜 AUDIT LOG
      const auditRef = db.collection("audit_logs").doc();

      transaction.set(auditRef, {
        type: "REVENUE_SPLIT",
        bookingId,
        driverId,
        fleetOwnerId,
        platformCommission,
        driverShare,
        ownerShare,
        gstAmount,
        tdsAmount,
        createdAt:
          admin.firestore.FieldValue.serverTimestamp(),
      });

      // FINAL BOOKING UPDATE
      transaction.update(bookingRef, {
        isSettled: true,
        processing: false,
        driverEscrowAmount: driverShare,
        ownerEscrowAmount: ownerShare,
      });
    });
  }
);
