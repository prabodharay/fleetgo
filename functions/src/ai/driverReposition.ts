
import { generateHeatmap } from "./heatmapGenerator";

export async function suggestDriverMovement(city: string) {

  const heatmap = await generateHeatmap(city);

  const sorted = Object.entries(heatmap)
    .sort((a: any, b: any) => b[1] - a[1]);

  const topZones = sorted.slice(0, 5);

  return topZones.map((z: any) => ({
    zone: z[0],
    demand: z[1]
  }));
}
