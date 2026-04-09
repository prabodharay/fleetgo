
class PricingRuleModel {
  final String id;

  PricingRuleModel({required this.id});

  factory PricingRuleModel.fromMap(Map<String, dynamic> map) {
    return PricingRuleModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
