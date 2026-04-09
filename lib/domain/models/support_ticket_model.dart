
class SupportTicketModel {
  final String id;

  SupportTicketModel({required this.id});

  factory SupportTicketModel.fromMap(Map<String, dynamic> map) {
    return SupportTicketModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
