
class CommissionModel {
  final String id;

  CommissionModel({required this.id});

  factory CommissionModel.fromMap(Map<String, dynamic> map) {
    return CommissionModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
