
class WalletModel {
  final String id;

  WalletModel({required this.id});

  factory WalletModel.fromMap(Map<String, dynamic> map) {
    return WalletModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
