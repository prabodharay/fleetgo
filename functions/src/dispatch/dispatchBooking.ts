import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

export const dispatchBooking = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {

    const snap = event.data;

    if (!snap) return;

    const booking = snap.data() as any;
    const bookingId = event.params.bookingId;

    // Use booking so TypeScript does not complain
    console.log("New booking created:", bookingId, booking);

    const drivers = await db
      .collection("drivers")
      .where("online", "==", true)
      .limit(5)
      .get();

    if (drivers.empty) {
      console.log("No drivers available");
      return;
    }

    const driver = drivers.docs[0];

    await db.collection("driver_jobs").doc(driver.id).set({
      bookingId,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

  }
);