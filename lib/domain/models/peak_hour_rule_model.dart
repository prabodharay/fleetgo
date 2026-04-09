
class PeakHourRuleModel {
  final String id;

  PeakHourRuleModel({required this.id});

  factory PeakHourRuleModel.fromMap(Map<String, dynamic> map) {
    return PeakHourRuleModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
