
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class AdminHeatmapPage extends StatelessWidget {
  const AdminHeatmapPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("Demand Heatmap")),

      body: StreamBuilder(
        stream: FirebaseFirestore.instance
            .collection("heatmaps")
            .doc("Bhubaneswar")
            .snapshots(),
        builder: (context, snapshot) {

          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final data = snapshot.data!.data() as Map;

          final zones = data["zones"] as Map;

          return ListView(
            children: zones.entries.map((e) {

              return ListTile(
                title: Text("Zone: ${e.key}"),
                trailing: Text("Demand: ${e.value}"),
              );

            }).toList(),
          );
        },
      ),
    );
  }
}
