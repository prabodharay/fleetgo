
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function applyReferral(code: string, userId: string) {

  const refSnap = await db
    .collection("referrals")
    .where("code", "==", code)
    .get();

  if (refSnap.empty) return false;

  await db.collection("wallets").doc(userId).update({
    balance: admin.firestore.FieldValue.increment(100)
  });

  return true;
}
