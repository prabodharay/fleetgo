
class CorporateEntity {
  final String id;

  CorporateEntity({required this.id});

  factory CorporateEntity.fromMap(Map<String, dynamic> map) {
    return CorporateEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
