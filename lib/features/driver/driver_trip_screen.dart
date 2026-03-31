
import 'package:flutter/material.dart';
import '../../core/services/driver_socket_service.dart';
import '../../domain/services/trip_service.dart';

class DriverTripScreen extends StatelessWidget {

  final String bookingId;

  const DriverTripScreen({super.key, required this.bookingId});

  @override
  Widget build(BuildContext context) {

    final socket = DriverSocketService().socket;
    final tripService = TripService(socket);

    return Scaffold(
      appBar: AppBar(title: const Text("Trip Ongoing")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [

            Text("Booking: $bookingId"),

            const SizedBox(height: 20),

            ElevatedButton(
              onPressed: () {
                tripService.startTrip(bookingId, "driver_123");
              },
              child: const Text("Start Trip"),
            ),

            const SizedBox(height: 10),

            ElevatedButton(
              onPressed: () {
                tripService.completeTrip(bookingId, 500, "driver_123");
              },
              child: const Text("Complete Trip"),
            )

          ],
        ),
      ),
    );
  }
}
