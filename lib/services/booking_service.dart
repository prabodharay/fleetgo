
import 'package:cloud_firestore/cloud_firestore.dart';

class BookingService {
  final db = FirebaseFirestore.instance;

  Future<String> createBooking() async {
    final doc = await db.collection("bookings").add({
      "status": "requested",
      "createdAt": FieldValue.serverTimestamp()
    });

    return doc.id;
  }
}
