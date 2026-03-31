import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";

const db = admin.firestore();

export const ledgerIntegrity = onSchedule(
{
 schedule:"every 24 hours",
 region:"us-central1"
},
async ()=>{

const wallets = await db.collection("wallets").get();

for(const wallet of wallets.docs){

const userId = wallet.id;

const txs = await db
.collection("wallet_transactions")
.where("userId","==",userId)
.get();

let balance = 0;

for(const t of txs.docs){

balance += t.data().amount;

}

await wallet.ref.update({
verifiedBalance: balance
});

}

});