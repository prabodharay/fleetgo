
class SurgeZoneModel {
  final String id;

  SurgeZoneModel({required this.id});

  factory SurgeZoneModel.fromMap(Map<String, dynamic> map) {
    return SurgeZoneModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
