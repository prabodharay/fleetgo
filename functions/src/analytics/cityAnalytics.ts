import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const cityAnalytics = onDocumentUpdated(
  "bookings/{bookingId}",
  async (event) => {
    const before = event.data?.before.data();
    const after = event.data?.after.data();
    if (!before || !after) return;

    if (before.status === "completed") return;
    if (after.status !== "completed") return;

    const city = after.city;
    const month = new Date().toISOString().slice(0, 7);

    const ref = db
      .collection("city_analytics")
      .doc(city)
      .collection("monthly")
      .doc(month);

    await ref.set(
      {
        totalTrips: admin.firestore.FieldValue.increment(1),
        totalRevenue:
          admin.firestore.FieldValue.increment(after.fare),
      },
      {merge: true}
    );
  }
);
