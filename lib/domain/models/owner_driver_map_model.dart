
class OwnerDriverMapModel {
  final String id;

  OwnerDriverMapModel({required this.id});

  factory OwnerDriverMapModel.fromMap(Map<String, dynamic> map) {
    return OwnerDriverMapModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
