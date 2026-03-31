
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class BookingMonitorPage extends StatelessWidget {
  const BookingMonitorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Bookings Monitor")),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection("bookings").snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const CircularProgressIndicator();

          final docs = snapshot.data!.docs;

          return ListView(
            children: docs.map((doc) {
              final b = doc.data();
              return ListTile(
                title: Text("Booking ${doc.id}"),
                subtitle: Text(b["status"] ?? ""),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
