
export function validateDriver(driver: any) {

  if (driver.state !== "Odisha") {
    throw new Error("Only Odisha drivers allowed");
  }

  if (!driver.city) {
    throw new Error("City is required");
  }
}
