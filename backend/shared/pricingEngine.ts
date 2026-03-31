
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function calculateFare(city: string, km: number, minutes: number) {

  const configSnap = await db
    .collection("pricing_config")
    .where("city", "==", city)
    .limit(1)
    .get();

  if (configSnap.empty) {
    throw new Error("Pricing not configured");
  }

  const config = configSnap.docs[0].data();

  const fare =
    config.baseFare +
    km * config.perKm +
    minutes * config.perMinute;

  return fare;
}
