
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class PricingPage extends StatelessWidget {
  const PricingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Pricing Control")),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection("pricing_config").snapshots(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) return const CircularProgressIndicator();

          final docs = snapshot.data!.docs;

          return ListView(
            children: docs.map((doc) {
              final p = doc.data();
              return ListTile(
                title: Text(p["city"]),
                subtitle: Text("Base Fare: ₹${p["baseFare"]}"),
              );
            }).toList(),
          );
        },
      ),
    );
  }
}
