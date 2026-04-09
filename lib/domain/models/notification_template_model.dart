
class NotificationTemplateModel {
  final String id;

  NotificationTemplateModel({required this.id});

  factory NotificationTemplateModel.fromMap(Map<String, dynamic> map) {
    return NotificationTemplateModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
