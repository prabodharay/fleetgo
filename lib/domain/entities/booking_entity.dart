
class BookingEntity {
  final String id;

  BookingEntity({required this.id});

  factory BookingEntity.fromMap(Map<String, dynamic> map) {
    return BookingEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
