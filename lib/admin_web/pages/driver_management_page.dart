import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class DriverManagementPage extends StatelessWidget {
  const DriverManagementPage({super.key});

  @override
  Widget build(BuildContext context) {

    return StreamBuilder(
      stream: FirebaseFirestore.instance.collection("drivers").snapshots(),
      builder: (context, snapshot) {

        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final docs = snapshot.data!.docs;

        return ListView(
          children: docs.map((doc) {

            final d = doc.data();

            return ListTile(
              title: Text(d["name"] ?? "Driver"),
              subtitle: Text(d["city"] ?? ""),
              trailing: Switch(
                value: d["approved"] ?? false,
                onChanged: (val) {
                  FirebaseFirestore.instance
                      .collection("drivers")
                      .doc(doc.id)
                      .update({"approved": val});
                },
              ),
            );

          }).toList(),
        );
      },
    );
  }
}