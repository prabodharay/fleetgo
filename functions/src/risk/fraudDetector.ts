import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const fraudDetector = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {
    const booking = event.data?.data();
    if (!booking) return;

    const driverId = booking.driverId;
    const fare = booking.fare;

    if (!driverId) return;

    // 1️⃣ High Fare Check
    if (fare > 50000) {
      await event.data?.ref.update({
        fraudFlag: true,
        fraudReason: "High fare anomaly",
      });
    }

    // 2️⃣ Rapid Booking Check
    const recent = await db
      .collection("bookings")
      .where("driverId", "==", driverId)
      .where(
        "createdAt",
        ">=",
        admin.firestore.Timestamp.fromMillis(
          Date.now() - 5 * 60 * 1000
        )
      )
      .get();

    if (recent.size > 5) {
      await event.data?.ref.update({
        fraudFlag: true,
        fraudReason: "Too many bookings in 5 min",
      });
    }
  }
);
