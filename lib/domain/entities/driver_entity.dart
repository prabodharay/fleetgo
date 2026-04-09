
class DriverEntity {
  final String id;

  DriverEntity({required this.id});

  factory DriverEntity.fromMap(Map<String, dynamic> map) {
    return DriverEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
