
class DistancePricingModel {
  final String id;

  DistancePricingModel({required this.id});

  factory DistancePricingModel.fromMap(Map<String, dynamic> map) {
    return DistancePricingModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
