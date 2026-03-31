
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
