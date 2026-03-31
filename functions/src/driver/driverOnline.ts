import { onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const driverOnline = onCall(async (request) => {

  const driverId = request.auth?.uid;

  if (!driverId) {
    throw new Error("Unauthorized");
  }

  const driverRef = db.collection("drivers").doc(driverId);

  const snap = await driverRef.get();

  if (!snap.exists) {
    throw new Error("Driver not found");
  }

  await driverRef.update({
    online: true,
    status: "available",
    lastOnlineAt: admin.firestore.FieldValue.serverTimestamp(),
    heartbeat: admin.firestore.FieldValue.serverTimestamp()
  });

  return {
    success: true
  };

});