
import 'package:flutter/material.dart';
import '../../core/services/booking_service.dart';

class DriverHome extends StatelessWidget {
  const DriverHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Driver App")),
      body: ListView(
        children: BookingService.bookings.map((b) {
          return ListTile(
            title: Text("Booking: ${b.id}"),
            subtitle: Text("Status: ${b.status}"),
          );
        }).toList(),
      ),
    );
  }
}
