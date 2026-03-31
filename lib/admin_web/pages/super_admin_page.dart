
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class SuperAdminPage extends StatelessWidget {
  const SuperAdminPage({super.key});

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: const Text("SaaS Control Panel")),

      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection("companies").snapshots(),
        builder: (context, snapshot) {

          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }

          final docs = snapshot.data!.docs;

          return ListView(
            children: docs.map((doc) {

              final c = doc.data();

              return ListTile(
                title: Text(c["name"]),
                subtitle: Text(c["plan"]),
              );

            }).toList(),
          );
        },
      ),
    );
  }
}
