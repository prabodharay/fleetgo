
class EscrowWalletModel {
  final String id;

  EscrowWalletModel({required this.id});

  factory EscrowWalletModel.fromMap(Map<String, dynamic> map) {
    return EscrowWalletModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
