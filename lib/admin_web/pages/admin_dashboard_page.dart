import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminDashboardPage extends StatelessWidget {
  const AdminDashboardPage({super.key});

  Future<Map<String, int>> loadStats() async {

    final bookings = await FirebaseFirestore.instance.collection("bookings").get();
    final drivers = await FirebaseFirestore.instance.collection("drivers").get();

    return {
      "bookings": bookings.size,
      "drivers": drivers.size
    };
  }

  @override
  Widget build(BuildContext context) {

    return FutureBuilder(
      future: loadStats(),
      builder: (context, snapshot) {

        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final data = snapshot.data as Map<String, int>;

        return Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [

              _card("Total Bookings", data["bookings"].toString()),
              const SizedBox(width: 20),
              _card("Total Drivers", data["drivers"].toString()),

            ],
          ),
        );
      },
    );
  }

  Widget _card(String title, String value) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(title),
            const SizedBox(height: 10),
            Text(value,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold
              ),
            )
          ],
        ),
      ),
    );
  }
}