
import * as admin from "firebase-admin";
import { calculateSurge } from "../ai/aiSurgeEngine";

const db = admin.firestore();

export async function calculateFinalFare(
  city: string,
  baseFare: number
) {

  const { surge } = await calculateSurge(city);

  const finalFare = baseFare * surge;

  return {
    baseFare,
    surge,
    finalFare
  };
}
