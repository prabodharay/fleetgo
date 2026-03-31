
import * as admin from "firebase-admin";

const db = admin.firestore();

export async function submitKYC(driverId: string, data: any) {
  await db.collection("driver_kyc").doc(driverId).set({
    ...data,
    status: "pending",
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
}

export async function approveKYC(driverId: string) {
  await db.collection("driver_kyc").doc(driverId).update({
    status: "approved"
  });

  await db.collection("drivers").doc(driverId).update({
    kycVerified: true
  });
}
