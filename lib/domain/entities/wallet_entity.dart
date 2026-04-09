
class WalletEntity {
  final String id;

  WalletEntity({required this.id});

  factory WalletEntity.fromMap(Map<String, dynamic> map) {
    return WalletEntity(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
