
export function validateOdishaBooking(booking: any) {

  if (booking.state !== "Odisha") {
    throw new Error("Service available only in Odisha");
  }

  const allowedCities = [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela"
  ];

  if (!allowedCities.includes(booking.city)) {
    throw new Error("City not supported yet");
  }
}
