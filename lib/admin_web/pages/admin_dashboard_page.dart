
import 'package:flutter/material.dart';
import '../../core/services/booking_service.dart';

class AdminDashboardPage extends StatelessWidget {
  const AdminDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    double revenue = BookingService.bookings.fold(
      0,
      (sum, b) => sum + b.fare,
    );

    return Center(
      child: Text("Total Revenue: ₹$revenue"),
    );
  }
}
