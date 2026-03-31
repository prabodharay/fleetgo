
import 'package:cloud_firestore/cloud_firestore.dart';

class DriverLocationService {

  final _db = FirebaseFirestore.instance;

  Future<void> updateLocation(
      String driverId,
      double lat,
      double lng) async {

    await _db.collection("drivers").doc(driverId).set({
      "location": {
        "lat": lat,
        "lng": lng
      }
    }, SetOptions(merge: true));
  }
}
