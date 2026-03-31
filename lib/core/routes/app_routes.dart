
import 'package:flutter/material.dart';
import '../../features/customer/home_screen.dart';
import '../../features/driver/driver_home.dart';

class AppRoutes {
  static Map<String, WidgetBuilder> routes = {
    '/': (context) => const HomeScreen(),
    '/driver': (context) => const DriverHome(),
  };
}
