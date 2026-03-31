
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../../features/driver/widgets/incoming_booking_dialog.dart';
import '../../domain/services/driver_job_service.dart';

BuildContext? globalContext;

void setGlobalContext(BuildContext context) {
  globalContext = context;
}

class DriverSocketService {
  static final DriverSocketService _instance =
      DriverSocketService._internal();

  factory DriverSocketService() => _instance;

  DriverSocketService._internal();

  late IO.Socket socket;

  void connect(String driverId) {
    socket = IO.io(
      'http://10.0.2.2:3001',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .build(),
    );

    socket.onConnect((_) {
      socket.emit("register", driverId);
    });

    socket.on("new_booking", (data) {
      if (globalContext == null) return;

      final bookingId = data["bookingId"];

      showDialog(
        context: globalContext!,
        builder: (_) => IncomingBookingDialog(
          bookingId: bookingId,
          onAccept: () {
            DriverJobService().acceptBooking(bookingId, driverId);
          },
          onReject: () {
            DriverJobService().rejectBooking(bookingId, driverId);
          },
        ),
      );
    });
  }
}
