
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
