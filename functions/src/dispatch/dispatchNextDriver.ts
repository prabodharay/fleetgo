
import { aiDispatch } from "../ai/aiDispatch";

export async function dispatchNextDriver(bookingId: string) {
  await aiDispatch(bookingId);
}
