
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function isServiceAvailable(city: string) {

  const snap = await db
    .collection("service_zones")
    .where("city", "==", city)
    .where("active", "==", true)
    .get();

  return !snap.empty;
}
