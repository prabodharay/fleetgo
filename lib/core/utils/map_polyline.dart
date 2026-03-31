
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPolyline {

  static Future<List<LatLng>> getRoute(
      LatLng start,
      LatLng end) async {

    PolylinePoints polylinePoints = PolylinePoints();

    final result = await polylinePoints.getRouteBetweenCoordinates(
      "YOUR_GOOGLE_MAP_API_KEY",
      PointLatLng(start.latitude, start.longitude),
      PointLatLng(end.latitude, end.longitude),
    );

    return result.points
        .map((e) => LatLng(e.latitude, e.longitude))
        .toList();
  }
}
