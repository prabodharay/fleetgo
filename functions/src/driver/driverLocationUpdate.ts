import { onCall } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { getCellId } from "../dispatch/geoGrid";

const db = admin.firestore();

/**
 * Driver Location Update
 * Called from driver app every few seconds
 */
export const driverLocationUpdate = onCall(async (request) => {

  const uid = request.auth?.uid;

  if (!uid) {
    throw new Error("Unauthorized");
  }

  const { lat, lng } = request.data;

  if (!lat || !lng) {
    throw new Error("Invalid coordinates");
  }

  const driverRef = db.collection("drivers").doc(uid);
  const driverSnap = await driverRef.get();

  if (!driverSnap.exists) {
    throw new Error("Driver not found");
  }

  const driver = driverSnap.data() as any;

  const newCell = getCellId(lat, lng);
  const oldCell = driver.cellId || null;

  /*
  --------------------------------
  Update driver location
  --------------------------------
  */

  await driverRef.update({
    location: {
      lat,
      lng
    },
    cellId: newCell,
    lastLocationUpdate: admin.firestore.FieldValue.serverTimestamp()
  });

  /*
  --------------------------------
  Remove driver from old cell
  --------------------------------
  */

  if (oldCell && oldCell !== newCell) {

    await db.collection("drivers_geo")
      .doc(oldCell)
      .update({
        drivers: admin.firestore.FieldValue.arrayRemove(uid)
      })
      .catch(() => null);

  }

  /*
  --------------------------------
  Add driver to new cell
  --------------------------------
  */

  await db.collection("drivers_geo")
    .doc(newCell)
    .set({
      drivers: admin.firestore.FieldValue.arrayUnion(uid),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

  /*
  --------------------------------
  Mark driver online
  --------------------------------
  */

  await driverRef.update({
    online: true
  });

  return {
    success: true,
    cell: newCell
  };

});