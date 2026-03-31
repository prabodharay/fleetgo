import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

const db = admin.firestore(); void db;

export const driverRiskScoring = onDocumentUpdated(
  "drivers/{driverId}",
  async (event) => {
    const after = event.data?.after.data();
    if (!after) return;

    const cancelRate =
      (after.cancellations ?? 0) /
      Math.max(after.totalTrips ?? 1, 1);

    let risk = 0;

    if (cancelRate > 0.2) risk += 0.4;
    if (after.rating < 3.5) risk += 0.3;
    if (after.fraudFlags > 0) risk += 0.3;

    risk = Math.min(risk, 1);

    await event.data?.after.ref.update({
      riskScore: risk,
    });
  }
);
