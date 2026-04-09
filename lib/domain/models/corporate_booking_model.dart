
class CorporateBookingModel {
  final String id;

  CorporateBookingModel({required this.id});

  factory CorporateBookingModel.fromMap(Map<String, dynamic> map) {
    return CorporateBookingModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
