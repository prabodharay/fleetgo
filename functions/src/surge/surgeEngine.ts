import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const surgePricingEngine = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {
    const booking = event.data?.data();
    if (!booking) return;

    const city = booking.city;

    const metricsSnap = await db
      .collection("city_metrics")
      .doc(city)
      .get();

    const metrics = metricsSnap.data();
    if (!metrics) return;

    const demandRatio =
      metrics.activeBookings / Math.max(metrics.activeDrivers, 1);

    let surge = 1.0;

    if (demandRatio > 2) surge += 0.5;
    if (metrics.peakHour) surge += 0.3;
    if (metrics.rainLevel > 0.7) surge += 0.2;

    surge = Math.min(surge, 2.5); // cap at 2.5x

    const newFare = booking.baseFare * surge;

    await event.data?.ref.update({
      surgeMultiplier: surge,
      fare: newFare,
    });
  }
);
