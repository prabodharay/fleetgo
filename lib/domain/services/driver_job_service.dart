
import 'package:cloud_firestore/cloud_firestore.dart';

class DriverJobService {

  final _db = FirebaseFirestore.instance;

  Future<void> acceptBooking(String bookingId, String driverId) async {

    await _db.collection("bookings").doc(bookingId).update({
      "status": "driver_assigned",
      "driverId": driverId,
    });

  }

  Future<void> rejectBooking(String bookingId, String driverId) async {

    await _db.collection("dispatch_rejections").add({
      "bookingId": bookingId,
      "driverId": driverId,
      "createdAt": FieldValue.serverTimestamp()
    });

  }

}
