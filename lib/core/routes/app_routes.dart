
import 'package:flutter/material.dart';
import '../../admin_web/layout/admin_layout.dart';
import '../../driver/home/driver_home.dart';
import '../../customer/home/customer_home.dart';
import '../services/auth_service.dart';

class AppRoutes {
  static Map<String, WidgetBuilder> routes = {
    '/': (context) => const RolePage(),
    '/admin': (context) => const AdminLayout(),
    '/driver': (context) => const DriverHome(),
    '/customer': (context) => const CustomerHome(),
  };
}

class RolePage extends StatelessWidget {
  const RolePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            ElevatedButton(
              onPressed: () {
                AuthService.login("admin");
                Navigator.pushNamed(context, '/admin');
              },
              child: const Text("Admin"),
            ),

            ElevatedButton(
              onPressed: () {
                AuthService.login("driver");
                Navigator.pushNamed(context, '/driver');
              },
              child: const Text("Driver"),
            ),

            ElevatedButton(
              onPressed: () {
                AuthService.login("customer");
                Navigator.pushNamed(context, '/customer');
              },
              child: const Text("Customer"),
            ),
          ],
        ),
      ),
    );
  }
}
