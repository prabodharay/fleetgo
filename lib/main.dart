
import 'package:flutter/material.dart';
import 'maps/live_map.dart';
import 'core/services/socket_service.dart';

void main() {
  SocketService.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: LiveMapPage(),
    );
  }
}
