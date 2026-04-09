
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final socket = IO.io(
    "http://localhost:3000",
    IO.OptionBuilder().setTransports(['websocket']).build(),
  );

  static init() {
    socket.connect();

    socket.on("connect", (_) {
      print("Connected to backend");
    });

    socket.on("driversUpdate", (data) {
      print("Driver Update: $data");
    });
  }
}
