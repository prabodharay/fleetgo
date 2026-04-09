
class DistanceRuleModel {
  final String id;

  DistanceRuleModel({required this.id});

  factory DistanceRuleModel.fromMap(Map<String, dynamic> map) {
    return DistanceRuleModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
