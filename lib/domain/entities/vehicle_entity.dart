
class VehicleEntity {
  final String id;

  VehicleEntity({required this.id});

  factory VehicleEntity.fromMap(Map<String, dynamic> map) {
    return VehicleEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
