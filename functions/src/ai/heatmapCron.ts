
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { generateHeatmap } from "./heatmapGenerator";

const db = admin.firestore();

/*
 Runs every 5 minutes
*/
export const heatmapCron = onSchedule(
{
  schedule: "*/5 * * * *",
  timeZone: "UTC",
  region: "us-central1"
},
async () => {

  const cities = ["Bhubaneswar", "Cuttack", "Rourkela"];

  for (const city of cities) {

    const zones = await generateHeatmap(city);

    await db.collection("heatmaps").doc(city).set({
      zones,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("Updated heatmap:", city);
  }
});
