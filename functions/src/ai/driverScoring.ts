
export function scoreDriver(driver: any, distance: number) {

  const rating = driver.rating || 4.5;
  const earnings = driver.todayEarnings || 0;

  // Fair distribution logic
  const earningsFactor = earnings < 500 ? 1.2 : 0.8;

  const score =
    (5 - distance) * 0.5 +
    rating * 0.3 +
    earningsFactor * 0.2;

  return score;
}
