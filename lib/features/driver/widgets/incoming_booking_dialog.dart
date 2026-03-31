
import 'dart:async';
import 'package:flutter/material.dart';

class IncomingBookingDialog extends StatefulWidget {
  final String bookingId;
  final Function onAccept;
  final Function onReject;

  const IncomingBookingDialog({
    super.key,
    required this.bookingId,
    required this.onAccept,
    required this.onReject,
  });

  @override
  State<IncomingBookingDialog> createState() =>
      _IncomingBookingDialogState();
}

class _IncomingBookingDialogState
    extends State<IncomingBookingDialog> {

  int seconds = 15;
  Timer? timer;

  @override
  void initState() {
    super.initState();

    timer = Timer.periodic(const Duration(seconds: 1), (t) {
      setState(() {
        seconds--;
      });

      if (seconds <= 0) {
        timer?.cancel();
        widget.onReject();
        Navigator.pop(context);
      }
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [

            const Icon(Icons.local_shipping, size: 50),

            const SizedBox(height: 10),

            const Text(
              "New Booking Request",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold
              ),
            ),

            const SizedBox(height: 10),

            Text("Booking ID: ${widget.bookingId}"),

            const SizedBox(height: 20),

            Text(
              "Time left: $seconds sec",
              style: const TextStyle(color: Colors.red),
            ),

            const SizedBox(height: 20),

            Row(
              children: [

                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                    ),
                    onPressed: () {
                      widget.onReject();
                      Navigator.pop(context);
                    },
                    child: const Text("Reject"),
                  ),
                ),

                const SizedBox(width: 10),

                Expanded(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                    ),
                    onPressed: () {
                      widget.onAccept();
                      Navigator.pop(context);
                    },
                    child: const Text("Accept"),
                  ),
                ),

              ],
            )

          ],
        ),
      ),
    );
  }
}
