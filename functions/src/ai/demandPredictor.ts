
import * as admin from "firebase-admin";

const db = admin.firestore();

/*
 Predict demand based on past bookings
*/
export async function predictDemand(city: string) {

  const snapshot = await db
    .collection("bookings")
    .where("city", "==", city)
    .get();

  const hourly: any = {};

  for (const doc of snapshot.docs) {

    const data = doc.data();
    const time = data.createdAt?.toDate();

    if (!time) continue;

    const hour = time.getHours();

    hourly[hour] = (hourly[hour] || 0) + 1;
  }

  return hourly;
}
