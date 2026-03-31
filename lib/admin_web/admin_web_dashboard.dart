
import 'package:flutter/material.dart';
import 'admin_dashboard_page.dart';
import 'driver_management_page.dart';
import 'booking_monitor_page.dart';
import 'dispatch_monitor_page.dart';
import 'pricing_page.dart';
import 'payout_approval_page.dart';
import 'admin_analytics_page.dart';
import 'admin_driver_map_page.dart';

class AdminWebDashboard extends StatefulWidget {
  const AdminWebDashboard({super.key});

  @override
  State<AdminWebDashboard> createState() => _AdminWebDashboardState();
}

class _AdminWebDashboardState extends State<AdminWebDashboard> {

  int index = 0;

  final pages = const [
    AdminDashboardPage(),
    AdminAnalyticsPage(),
    AdminDriverMapPage(),
    DriverManagementPage(),
    BookingMonitorPage(),
    DispatchMonitorPage(),
    PricingPage(),
    PayoutApprovalPage(),
  ];

  final titles = [
    "Dashboard",
    "Analytics",
    "Driver Map",
    "Drivers",
    "Bookings",
    "Dispatch",
    "Pricing",
    "Payouts"
  ];

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Row(
        children: [

          Container(
            width: 220,
            color: Colors.black87,
            child: ListView.builder(
              itemCount: titles.length,
              itemBuilder: (context, i) {
                return ListTile(
                  title: Text(
                    titles[i],
                    style: const TextStyle(color: Colors.white),
                  ),
                  onTap: () {
                    setState(() => index = i);
                  },
                );
              },
            ),
          ),

          Expanded(
            child: Column(
              children: [

                Container(
                  height: 60,
                  color: Colors.grey.shade200,
                  alignment: Alignment.centerLeft,
                  padding: const EdgeInsets.all(16),
                  child: Text(
                    titles[index],
                    style: const TextStyle(fontSize: 20),
                  ),
                ),

                Expanded(child: pages[index])

              ],
            ),
          )

        ],
      ),
    );
  }
}
