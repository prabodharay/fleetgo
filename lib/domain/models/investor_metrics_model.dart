
class InvestorMetricsModel {
  final String id;

  InvestorMetricsModel({required this.id});

  factory InvestorMetricsModel.fromMap(Map<String, dynamic> map) {
    return InvestorMetricsModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
