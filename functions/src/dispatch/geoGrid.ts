import { geohashQueryBounds, geohashForLocation } from "geofire-common";

export const GRID_PRECISION = 5;

export function getCellId(lat: number, lng: number) {
  const hash = geohashForLocation([lat, lng]);
  return hash.substring(0, GRID_PRECISION);
}

export function getNearbyCells(lat: number, lng: number) {

  const bounds = geohashQueryBounds([lat, lng], 2000);

  const cells: string[] = [];

  for (const b of bounds) {

    const start = b[0].substring(0, GRID_PRECISION);
    const end = b[1].substring(0, GRID_PRECISION);

    cells.push(start);
    cells.push(end);

  }

  return [...new Set(cells)];
}