
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PayoutApprovalPage extends StatelessWidget {
  const PayoutApprovalPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Payout Approval")),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection("payout_requests")
            .where("status", isEqualTo: "pending")
            .snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const CircularProgressIndicator();

          final docs = snapshot.data!.docs;

          return ListView(
            children: docs.map((doc) {
              final p = doc.data();
              return ListTile(
                title: Text("₹${p["amount"]}"),
                trailing: ElevatedButton(
                  onPressed: () {
                    FirebaseFirestore.instance
                        .collection("payout_requests")
                        .doc(doc.id)
                        .update({"status": "approved"});
                  },
                  child: const Text("Approve"),
                ),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
