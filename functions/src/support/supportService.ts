
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function createTicket(userId: string, message: string) {
  await db.collection("support_tickets").add({
    userId,
    message,
    status: "open",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}
