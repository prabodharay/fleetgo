import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const investorAggregator = onDocumentUpdated(
  "bookings/{bookingId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    if (before.status === "completed") return;
    if (after.status !== "completed") return;

    const monthKey = new Date().toISOString().slice(0, 7);

    await db.collection("investor_metrics")
      .doc(monthKey)
      .set(
        {
          totalGMV:
            admin.firestore.FieldValue.increment(after.fare),
          platformRevenue:
            admin.firestore.FieldValue.increment(
              after.platformCommission ?? 0
            ),
        },
        {merge: true}
      );
  }
);
