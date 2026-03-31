const fs = require("fs");
const base = "C:/Users/Asus/fleetgo/lib";

// =======================
// FIX DRIVER SOCKET SERVICE
// =======================

fs.writeFileSync(`${base}/core/services/driver_socket_service.dart`, `
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../../features/driver/widgets/incoming_booking_dialog.dart';
import '../../domain/services/driver_job_service.dart';

BuildContext? globalContext;

void setGlobalContext(BuildContext context) {
  globalContext = context;
}

class DriverSocketService {
  static final DriverSocketService _instance =
      DriverSocketService._internal();

  factory DriverSocketService() => _instance;

  DriverSocketService._internal();

  late IO.Socket socket;

  void connect(String driverId) {
    socket = IO.io(
      'http://10.0.2.2:3001',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .build(),
    );

    socket.onConnect((_) {
      socket.emit("register", driverId);
    });

    socket.on("new_booking", (data) {
      if (globalContext == null) return;

      final bookingId = data["bookingId"];

      showDialog(
        context: globalContext!,
        builder: (_) => IncomingBookingDialog(
          bookingId: bookingId,
          onAccept: () {
            DriverJobService().acceptBooking(bookingId, driverId);
          },
          onReject: () {
            DriverJobService().rejectBooking(bookingId, driverId);
          },
        ),
      );
    });
  }
}
`);

// =======================
// FIX DRIVER HOME
// =======================

fs.writeFileSync(`${base}/features/driver/driver_home_screen.dart`, `
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
`);

// =======================
// SAFE FIRESTORE FIX
// =======================

fs.writeFileSync(`${base}/features/tracking/live_tracking_screen.dart`, `
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class LiveTrackingScreen extends StatelessWidget {
  final String bookingId;

  const LiveTrackingScreen({super.key, required this.bookingId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Live Tracking")),
      body: StreamBuilder<DocumentSnapshot>(
        stream: FirebaseFirestore.instance
            .collection("drivers")
            .doc("driver_123")
            .snapshots(),
        builder: (context, snapshot) {

          if (!snapshot.hasData || snapshot.data?.data() == null) {
            return const Center(child: CircularProgressIndicator());
          }

          final data = snapshot.data!.data() as Map<String, dynamic>;

          final lat = data["location"]?["lat"] ?? 20.2961;
          final lng = data["location"]?["lng"] ?? 85.8245;

          return GoogleMap(
            initialCameraPosition: CameraPosition(
              target: LatLng(lat, lng),
              zoom: 14,
            ),
            markers: {
              Marker(
                markerId: const MarkerId("driver"),
                position: LatLng(lat, lng),
              )
            },
          );
        },
      ),
    );
  }
}
`);

// =======================
// BASIC EMPTY FILE FIX
// =======================

const emptyFix = `
class PlaceholderScreen {
  void init() {}
}
`;

const emptyFiles = [
  "core/services/payment_service.dart",
  "core/services/notification_service.dart",
  "core/services/firebase_service.dart",
  "domain/services/wallet_service.dart",
];

emptyFiles.forEach(file => {
  const full = base + "/" + file;
  if (!fs.existsSync(full) || fs.readFileSync(full, "utf8").trim() === "") {
    fs.writeFileSync(full, emptyFix);
  }
});

console.log("✅ FleetGo Dart FIX COMPLETE");