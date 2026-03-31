import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const dailyMetrics = onSchedule(
{
 schedule:"every 24 hours",
 region:"us-central1"
},
async ()=>{

const bookings = await db.collection("bookings").get();

let revenue = 0;
let trips = 0;

for(const b of bookings.docs){

const data = b.data();

if(data.status === "completed"){
revenue += data.fare || 0;
trips++;
}

}

await db.collection("investor_metrics")
.doc("daily")
.set({

date: new Date(),
revenue,
trips

});

});