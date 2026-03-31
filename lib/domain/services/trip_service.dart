
import 'package:socket_io_client/socket_io_client.dart' as IO;

class TripService {

  final IO.Socket socket;

  TripService(this.socket);

  void startTrip(String bookingId, String driverId) {
    socket.emit("start_trip", {
      "bookingId": bookingId,
      "driverId": driverId
    });
  }

  void completeTrip(String bookingId, double fare, String driverId) {
    socket.emit("complete_trip", {
      "bookingId": bookingId,
      "fare": fare,
      "driverId": driverId
    });
  }
}
