import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const driverAvailabilityCleanup = onSchedule(
  {
    schedule: "every 10 minutes",
    timeZone: "UTC"
  },
  async () => {

    const cells = await db.collection("drivers_geo").get();

    for (const cell of cells.docs) {

      const data = cell.data() as any;

      const drivers = data.drivers || [];

      const validDrivers: string[] = [];

      for (const driverId of drivers) {

        const snap = await db.collection("drivers").doc(driverId).get();

        if (!snap.exists) continue;

        const driver = snap.data() as any;

        if (driver.online) {
          validDrivers.push(driverId);
        }

      }

      await cell.ref.set({
        drivers: validDrivers
      });

    }

  }
);