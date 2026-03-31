import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const analyticsAggregator = onDocumentUpdated(
  "bookings/{bookingId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    if (before.status === "completed") return;
    if (after.status !== "completed") return;

    const monthKey = new Date().toISOString().slice(0, 7);

    const analyticsRef = db
      .collection("analytics")
      .doc("platform")
      .collection("monthly")
      .doc(monthKey);

    await analyticsRef.set(
      {
        totalTrips: admin.firestore.FieldValue.increment(1),
        totalRevenue: admin.firestore.FieldValue.increment(
          after.fare
        ),
        totalPlatformCommission:
          admin.firestore.FieldValue.increment(
            after.platformCommission ?? 0
          ),
      },
      {merge: true}
    );
  }
);
