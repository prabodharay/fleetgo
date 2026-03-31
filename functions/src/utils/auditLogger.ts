import * as admin from "firebase-admin";

const db = admin.firestore();

export async function logAudit(data: any) {
  await db.collection("audit_logs").add({
    ...data,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}
