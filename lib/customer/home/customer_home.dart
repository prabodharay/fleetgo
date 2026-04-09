
import 'package:flutter/material.dart';
import '../../core/services/booking_service.dart';
import '../../core/services/dispatch_service.dart';

class CustomerHome extends StatelessWidget {
  const CustomerHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Book Vehicle")),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            final booking = BookingService.create("cust1");
            DispatchService.assignDriver(booking);

            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text("Driver Assigned: ${booking.driverId}")),
            );
          },
          child: const Text("Book Now"),
        ),
      ),
    );
  }
}
