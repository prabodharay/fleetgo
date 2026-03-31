import { onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const driverOffline = onCall(async (request) => {

  const driverId = request.auth?.uid;

  if (!driverId) {
    throw new Error("Unauthorized");
  }

  const driverRef = db.collection("drivers").doc(driverId);

  const snap = await driverRef.get();

  if (!snap.exists) {
    throw new Error("Driver not found");
  }

  const driver = snap.data() as any;

  const cellId = driver.cellId;

  await driverRef.update({
    online: false,
    status: "offline",
    lastOfflineAt: admin.firestore.FieldValue.serverTimestamp()
  });

  if (cellId) {

    await db.collection("drivers_geo")
      .doc(cellId)
      .update({
        drivers: admin.firestore.FieldValue.arrayRemove(driverId)
      })
      .catch(() => null);

  }

  return {
    success: true
  };

});