
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class DispatchMonitorPage extends StatelessWidget {
  const DispatchMonitorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Dispatch Monitor")),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection("bookings")
            .where("status", isEqualTo: "searching_driver")
            .snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const CircularProgressIndicator();

          final docs = snapshot.data!.docs;

          return ListView(
            children: docs.map((doc) {
              return ListTile(
                title: Text("Searching Driver: ${doc.id}"),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
