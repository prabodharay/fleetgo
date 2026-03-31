import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import crypto from "crypto";

const db = admin.firestore();

export const razorpayWebhook = onRequest(async (req,res)=>{

const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

const signature = req.headers["x-razorpay-signature"] as string;

const expected = crypto
  .createHmac("sha256", secret)
  .update(JSON.stringify(req.body))
  .digest("hex");

if(signature !== expected){
  res.status(400).send("Invalid signature");
  return;
}

const payment = req.body.payload.payment.entity;

await db.collection("payments").doc(payment.id).set(payment);

res.send("OK");

});