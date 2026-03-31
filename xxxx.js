const fs = require("fs");
const path = require("path");

const ROOT = "./lib";

//////////////////////////////////////////
// HELPER FUNCTIONS
//////////////////////////////////////////

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function writeIfEmpty(filePath, content) {
  ensureDir(filePath);

  if (!fs.existsSync(filePath) || fs.readFileSync(filePath, "utf8").trim() === "") {
    fs.writeFileSync(filePath, content);
    console.log("✅ Created:", filePath);
  } else {
    console.log("⏭️ Exists:", filePath);
  }
}

//////////////////////////////////////////
// CORE FILES
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/main.dart`, `
import 'package:flutter/material.dart';
import 'core/app/fleet_go_app.dart';

void main() {
  runApp(const FleetGoApp());
}
`);

writeIfEmpty(`${ROOT}/core/app/fleet_go_app.dart`, `
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
`);

writeIfEmpty(`${ROOT}/core/routes/app_routes.dart`, `
import 'package:flutter/material.dart';
import '../../admin_web/layout/admin_layout.dart';
import '../../customer/home/customer_home.dart';
import '../../driver/home/driver_home.dart';

class AppRoutes {
  static Map<String, WidgetBuilder> routes = {
    '/': (context) => const RoleSelectPage(),
    '/admin': (context) => const AdminLayout(),
    '/driver': (context) => const DriverHome(),
    '/customer': (context) => const CustomerHome(),
  };
}

class RoleSelectPage extends StatelessWidget {
  const RoleSelectPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [

            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/admin'),
              child: const Text("Admin"),
            ),

            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/driver'),
              child: const Text("Driver"),
            ),

            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/customer'),
              child: const Text("Customer"),
            ),

          ],
        ),
      ),
    );
  }
}
`);

//////////////////////////////////////////
// ADMIN LAYOUT
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/admin_web/layout/admin_layout.dart`, `
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
`);

//////////////////////////////////////////
// ADMIN PAGES
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/admin_web/pages/admin_dashboard_page.dart`, `
import 'package:flutter/material.dart';

class AdminDashboardPage extends StatelessWidget {
  const AdminDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text("Admin Dashboard"),
    );
  }
}
`);

writeIfEmpty(`${ROOT}/admin_web/pages/pricing_settings_page.dart`, `
import 'package:flutter/material.dart';

class PricingSettingsPage extends StatelessWidget {
  const PricingSettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Pricing Settings"));
  }
}
`);

writeIfEmpty(`${ROOT}/admin_web/pages/refund_requests_page.dart`, `
import 'package:flutter/material.dart';

class RefundRequestsPage extends StatelessWidget {
  const RefundRequestsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Refund Requests"));
  }
}
`);

writeIfEmpty(`${ROOT}/admin_web/pages/surge_zone_settings_page.dart`, `
import 'package:flutter/material.dart';

class SurgeZoneSettingsPage extends StatelessWidget {
  const SurgeZoneSettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Surge Zone Settings"));
  }
}
`);

//////////////////////////////////////////
// DRIVER
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/driver/home/driver_home.dart`, `
import 'package:flutter/material.dart';

class DriverHome extends StatelessWidget {
  const DriverHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Driver App")),
      body: const Center(child: Text("Driver Dashboard")),
    );
  }
}
`);

//////////////////////////////////////////
// CUSTOMER
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/customer/home/customer_home.dart`, `
import 'package:flutter/material.dart';

class CustomerHome extends StatelessWidget {
  const CustomerHome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Customer App")),
      body: Column(
        children: const [
          TextField(decoration: InputDecoration(hintText: "Pickup")),
          TextField(decoration: InputDecoration(hintText: "Drop")),
        ],
      ),
    );
  }
}
`);

//////////////////////////////////////////
// SERVICES (FIX EMPTY FILES)
//////////////////////////////////////////

writeIfEmpty(`${ROOT}/admin_web/services/admin_session.dart`, `
class AdminSession {
  static String role = "admin";
}
`);

writeIfEmpty(`${ROOT}/admin_web/services/admin_revenue_service.dart`, `
class AdminRevenueService {
  double getRevenue() => 0;
}
`);

writeIfEmpty(`${ROOT}/admin_web/services/operations_service.dart`, `
class OperationsService {
  void run() {}
}
`);

//////////////////////////////////////////

console.log("\\n🚀 FleetGo Project Fixed & Generated Successfully!");