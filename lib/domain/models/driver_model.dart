
class DriverModel {
  final String id;

  DriverModel({required this.id});

  factory DriverModel.fromMap(Map<String, dynamic> map) {
    return DriverModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
