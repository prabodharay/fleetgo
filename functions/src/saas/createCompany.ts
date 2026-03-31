
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function createCompany(name: string) {

  const ref = await db.collection("companies").add({
    name,
    plan: "basic",
    active: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return ref.id;
}
