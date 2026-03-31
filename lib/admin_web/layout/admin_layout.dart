
import 'package:flutter/material.dart';
import '../pages/admin_dashboard_page.dart';

class AdminLayout extends StatefulWidget {
  const AdminLayout({super.key});

  @override
  State<AdminLayout> createState() => _AdminLayoutState();
}

class _AdminLayoutState extends State<AdminLayout> {
  int index = 0;

  final pages = const [
    AdminDashboardPage(),
  ];

  final titles = ["Dashboard"];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          Container(
            width: 200,
            color: Colors.black,
            child: ListView.builder(
              itemCount: titles.length,
              itemBuilder: (_, i) => ListTile(
                title: Text(titles[i], style: const TextStyle(color: Colors.white)),
                onTap: () => setState(() => index = i),
              ),
            ),
          ),
          Expanded(child: pages[index])
        ],
      ),
    );
  }
}
