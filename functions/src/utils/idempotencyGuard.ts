import * as admin from "firebase-admin";

const db = admin.firestore();

export async function checkIdempotency(
  key: string
): Promise<boolean> {
  const ref = db.collection("idempotency_keys").doc(key);
  const snap = await ref.get();

  if (snap.exists) {
    return false;
  }

  await ref.set({
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return true;
}
