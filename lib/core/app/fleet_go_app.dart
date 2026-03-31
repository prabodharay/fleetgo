
import 'package:flutter/material.dart';
import '../routes/app_routes.dart';

class FleetGoApp extends StatelessWidget {
  const FleetGoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FleetGo',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: AppRoutes.routes,
    );
  }
}
