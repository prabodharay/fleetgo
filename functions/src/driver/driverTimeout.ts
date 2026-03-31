import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const driverTimeout = onSchedule(
  {
    schedule: "every 2 minutes",
    timeZone: "UTC"
  },
  async () => {

    const now = Date.now();

    const snapshot = await db
      .collection("drivers")
      .where("online", "==", true)
      .get();

    for (const doc of snapshot.docs) {

      const driver = doc.data() as any;

      const last = driver.lastLocationUpdate?.toMillis?.() || 0;

      const diff = now - last;

      if (diff > 120000) {

        const cell = driver.cellId;

        await doc.ref.update({
          online: false,
          status: "timeout"
        });

        if (cell) {

          await db.collection("drivers_geo")
            .doc(cell)
            .update({
              drivers: admin.firestore.FieldValue.arrayRemove(doc.id)
            })
            .catch(() => null);

        }

      }

    }

  }
);