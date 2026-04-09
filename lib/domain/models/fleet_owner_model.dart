
class FleetOwnerModel {
  final String id;

  FleetOwnerModel({required this.id});

  factory FleetOwnerModel.fromMap(Map<String, dynamic> map) {
    return FleetOwnerModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
