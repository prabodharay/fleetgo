
class BookingModel {
  final String id;

  BookingModel({required this.id});

  factory BookingModel.fromMap(Map<String, dynamic> map) {
    return BookingModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
