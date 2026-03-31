
import 'package:flutter/material.dart';
import '../../core/services/driver_socket_service.dart';

class DriverHomeScreen extends StatefulWidget {
  const DriverHomeScreen({super.key});

  @override
  State<DriverHomeScreen> createState() => _DriverHomeScreenState();
}

class _DriverHomeScreenState extends State<DriverHomeScreen> {

  @override
  void initState() {
    super.initState();
    DriverSocketService().connect("driver_123");
  }

  @override
  Widget build(BuildContext context) {
    setGlobalContext(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Driver Dashboard')),
      body: const Center(child: Text('Driver Online')),
    );
  }
}
