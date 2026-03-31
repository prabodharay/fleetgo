
import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminDriverMapPage extends StatelessWidget {
  const AdminDriverMapPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Live Driver Map")),

      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection("drivers").snapshots(),
        builder: (context, snapshot) {

          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final docs = snapshot.data!.docs;

          final markers = docs.map((doc) {

            final d = doc.data();
            final lat = d["location"]?["lat"] ?? 20.2961;
            final lng = d["location"]?["lng"] ?? 85.8245;

            return Marker(
              markerId: MarkerId(doc.id),
              position: LatLng(lat, lng),
              infoWindow: InfoWindow(title: d["name"] ?? "Driver"),
            );

          }).toSet();

          return GoogleMap(
            initialCameraPosition: const CameraPosition(
              target: LatLng(20.2961, 85.8245),
              zoom: 12,
            ),
            markers: markers,
          );
        },
      ),
    );
  }
}
