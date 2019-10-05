import { ParsedEntry } from "types/base";
import { monthNames } from "../utils";

export function Monthly(entries: ParsedEntry[]): string {
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const averages = entries.reduce(
    (monthly: number[], entry: ParsedEntry): number[] => {
      const month = entry.date.getMonth();
      monthly[month] += entry.difference;
      return monthly;
    },
    months
  );

  return averages
    .map(
      (month: number, index: number): string =>
        `${monthNames[index]}: ${month.toFixed(2)}`
    )
    .join("\n");
}
