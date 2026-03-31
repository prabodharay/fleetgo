import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import Razorpay from "razorpay";

const db = admin.firestore();

/**
 * FleetGo Driver Payout Processor
 * Processes payout to driver bank account using Razorpay
 */

export const payoutProcessor = onRequest(async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send("Invalid request");
      return;
    }

    const { driverId, amount, bankAccount, ifsc, name, email, phone } = req.body;

    if (!driverId || !amount) {
      res.status(400).send("Missing required fields");
      return;
    }

    // Initialize Razorpay INSIDE the function (important for Firebase deploy)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || ""
    });

    console.log("Processing payout for driver:", driverId);

    // Create Razorpay payout
    const payout = await razorpay.payouts.create({
      account_number: "YOUR_ACCOUNT_NUMBER", // Razorpay account number
      fund_account: {
        account_type: "bank_account",
        bank_account: {
          name: name || "Driver",
          ifsc: ifsc,
          account_number: bankAccount
        },
        contact: {
          name: name || "Driver",
          email: email || "driver@fleetgo.com",
          contact: phone || "9999999999",
          type: "employee"
        }
      },
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: "INR",
      mode: "IMPS",
      purpose: "payout",
      queue_if_low_balance: true,
      narration: "FleetGo Driver Earnings"
    });

    console.log("Payout success:", payout.id);

    // Save payout record
    await db.collection("payouts").doc(payout.id).set({
      driverId,
      amount,
      payoutId: payout.id,
      status: payout.status,
      method: "razorpay",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // Update driver wallet
    await db.collection("wallets").doc(driverId).update({
      lastPayout: amount,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(200).send({
      success: true,
      payoutId: payout.id
    });

  } catch (error) {
    console.error("Payout error:", error);

    await db.collection("payout_errors").add({
      error: String(error),
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(500).send({
      success: false,
      message: "Payout failed"
    });
  }
});