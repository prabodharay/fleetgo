
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class CustomerBookingScreen extends StatelessWidget {

  const CustomerBookingScreen({super.key});

  Future<void> createBooking() async {

    await FirebaseFirestore.instance.collection("bookings").add({
      "status": "searching_driver",
      "pickup": {"lat": 20.2961, "lng": 85.8245},
      "drop": {"lat": 20.3000, "lng": 85.8200},
      "createdAt": FieldValue.serverTimestamp()
    });

  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Book Ride")),
      body: Center(
        child: ElevatedButton(
          onPressed: createBooking,
          child: const Text("Book Now"),
        ),
      ),
    );
  }
}
