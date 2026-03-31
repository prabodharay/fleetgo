
import * as admin from "firebase-admin";

export async function sendNotification(token: string, title: string, body: string) {

  await admin.messaging().send({
    token,
    notification: { title, body }
  });
}
