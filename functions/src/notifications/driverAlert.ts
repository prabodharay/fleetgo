
import { sendNotification } from "./fcmService";

export async function notifyDriverJob(token: string, bookingId: string) {
  await sendNotification(
    token,
    "New Booking",
    "You have a new job request"
  );
}
