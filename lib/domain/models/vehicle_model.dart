
class VehicleModel {
  final String id;

  VehicleModel({required this.id});

  factory VehicleModel.fromMap(Map<String, dynamic> map) {
    return VehicleModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
