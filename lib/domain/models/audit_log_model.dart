
class AuditLogModel {
  final String id;

  AuditLogModel({required this.id});

  factory AuditLogModel.fromMap(Map<String, dynamic> map) {
    return AuditLogModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
