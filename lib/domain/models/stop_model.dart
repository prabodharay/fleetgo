
class StopModel {
  final String id;

  StopModel({required this.id});

  factory StopModel.fromMap(Map<String, dynamic> map) {
    return StopModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
