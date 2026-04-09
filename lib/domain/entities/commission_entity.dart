
class CommissionEntity {
  final String id;

  CommissionEntity({required this.id});

  factory CommissionEntity.fromMap(Map<String, dynamic> map) {
    return CommissionEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
