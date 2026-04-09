const fs = require("fs");
const path = require("path");

////////////////////////////////////////////////////////
/// BACKEND SETUP
////////////////////////////////////////////////////////

function write(file, content) {
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content);
  console.log("✅ CREATED:", file);
}

// ================= BACKEND =================

write("./backend/server.js", `
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let drivers = {};
let bookings = [];

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Driver connected:", socket.id);

  socket.on("driverLocation", (data) => {
    drivers[socket.id] = data;
    io.emit("driversUpdate", drivers);
  });

  socket.on("disconnect", () => {
    delete drivers[socket.id];
  });
});

// CREATE BOOKING
app.post("/booking", (req, res) => {
  const booking = {
    id: Date.now(),
    status: "pending",
  };

  bookings.push(booking);

  // AUTO ASSIGN FIRST DRIVER
  const driverId = Object.keys(drivers)[0];

  if (driverId) {
    booking.driverId = driverId;
    booking.status = "assigned";

    io.to(driverId).emit("newBooking", booking);
  }

  res.json(booking);
});

server.listen(3000, () => {
  console.log("🚀 Backend running on http://localhost:3000");
});
`);

////////////////////////////////////////////////////////
/// FLUTTER MAP SCREEN
////////////////////////////////////////////////////////

write("./lib/maps/live_map.dart", `
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class LiveMapPage extends StatefulWidget {
  const LiveMapPage({super.key});

  @override
  State<LiveMapPage> createState() => _LiveMapPageState();
}

class _LiveMapPageState extends State<LiveMapPage> {

  final Set<Marker> markers = {};

  @override
  void initState() {
    super.initState();

    // Dummy driver marker
    markers.add(
      const Marker(
        markerId: MarkerId("driver1"),
        position: LatLng(20.2961, 85.8245),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Live Tracking")),
      body: GoogleMap(
        initialCameraPosition: const CameraPosition(
          target: LatLng(20.2961, 85.8245),
          zoom: 12,
        ),
        markers: markers,
      ),
    );
  }
}
`);

////////////////////////////////////////////////////////
/// SOCKET SERVICE (FLUTTER)
////////////////////////////////////////////////////////

write("./lib/core/services/socket_service.dart", `
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final socket = IO.io(
    "http://localhost:3000",
    IO.OptionBuilder().setTransports(['websocket']).build(),
  );

  static init() {
    socket.connect();

    socket.on("connect", (_) {
      print("Connected to backend");
    });

    socket.on("driversUpdate", (data) {
      print("Driver Update: \$data");
    });
  }
}
`);

////////////////////////////////////////////////////////
/// DRIVER LOCATION UPDATE
////////////////////////////////////////////////////////

write("./lib/driver/services/location_service.dart", `
import '../../core/services/socket_service.dart';

class LocationService {
  static sendLocation(double lat, double lng) {
    SocketService.socket.emit("driverLocation", {
      "lat": lat,
      "lng": lng,
    });
  }
}
`);

////////////////////////////////////////////////////////
/// CUSTOMER BOOKING API
////////////////////////////////////////////////////////

write("./lib/customer/services/booking_api.dart", `
import 'dart:convert';
import 'package:http/http.dart' as http;

class BookingAPI {
  static Future createBooking() async {
    final res = await http.post(
      Uri.parse("http://localhost:3000/booking"),
      headers: {"Content-Type": "application/json"},
    );

    return jsonDecode(res.body);
  }
}
`);

////////////////////////////////////////////////////////
/// MAIN UPDATE
////////////////////////////////////////////////////////

write("./lib/main.dart", `
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
`);

console.log("\\n🔥 FleetGo REAL BACKEND + MAPS READY!");