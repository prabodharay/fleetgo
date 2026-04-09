
class GstReportModel {
  final String id;

  GstReportModel({required this.id});

  factory GstReportModel.fromMap(Map<String, dynamic> map) {
    return GstReportModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
