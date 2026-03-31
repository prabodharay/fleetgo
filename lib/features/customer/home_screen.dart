
import 'package:flutter/material.dart';
import '../../services/booking_service.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final service = BookingService();

    return Scaffold(
      appBar: AppBar(title: const Text("FleetGo Customer")),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            final id = await service.createBooking();
            ScaffoldMessenger.of(context)
                .showSnackBar(SnackBar(content: Text("Booking: $id")));
          },
          child: const Text("Book Truck"),
        ),
      ),
    );
  }
}
