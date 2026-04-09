
class PromoModel {
  final String id;

  PromoModel({required this.id});

  factory PromoModel.fromMap(Map<String, dynamic> map) {
    return PromoModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
