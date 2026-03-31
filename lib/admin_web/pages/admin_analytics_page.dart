
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fl_chart/fl_chart.dart';

class AdminAnalyticsPage extends StatelessWidget {
  const AdminAnalyticsPage({super.key});

  Future<List<FlSpot>> getRevenueData() async {

    final snap = await FirebaseFirestore.instance
        .collection("bookings")
        .get();

    Map<int, double> daily = {};

    for (var doc in snap.docs) {
      final data = doc.data();
      final fare = (data["fare"] ?? 0).toDouble();
      final day = DateTime.now().day;

      daily[day] = (daily[day] ?? 0) + fare;
    }

    return daily.entries
        .map((e) => FlSpot(e.key.toDouble(), e.value))
        .toList();
  }

  @override
  Widget build(BuildContext context) {

    return FutureBuilder(
      future: getRevenueData(),
      builder: (context, snapshot) {

        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final spots = snapshot.data as List<FlSpot>;

        return Padding(
          padding: const EdgeInsets.all(20),
          child: LineChart(
            LineChartData(
              titlesData: FlTitlesData(show: true),
              borderData: FlBorderData(show: true),
              lineBarsData: [
                LineChartBarData(
                  spots: spots,
                  isCurved: true,
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
