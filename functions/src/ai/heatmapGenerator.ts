
import * as admin from "firebase-admin";

const db = admin.firestore();

/*
 Generate heat zones based on bookings
*/
export async function generateHeatmap(city: string) {

  const snapshot = await db
    .collection("bookings")
    .where("city", "==", city)
    .get();

  const zones: any = {};

  for (const doc of snapshot.docs) {

    const data = doc.data();

    const lat = data.pickup?.lat;
    const lng = data.pickup?.lng;

    if (!lat || !lng) continue;

    const key = lat.toFixed(2) + "_" + lng.toFixed(2);

    zones[key] = (zones[key] || 0) + 1;
  }

  return zones;
}
