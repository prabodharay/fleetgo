
class ReviewModel {
  final String id;

  ReviewModel({required this.id});

  factory ReviewModel.fromMap(Map<String, dynamic> map) {
    return ReviewModel(id: map['id'] ?? '');
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
    };
  }
}
