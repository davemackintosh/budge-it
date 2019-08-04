import {ParsedEntry} from '../types/base';

export function Monthly(entries: ParsedEntry[]): string {
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const averages = entries.reduce((monthly: number[], entry: ParsedEntry): number[] => {
    const month = entry.date.getMonth()
    monthly[month] += entry.difference
    return monthly
  }, months)

  console.log(months)

  return averages
    .map((month: number, index: number): string => `${monthNames[index]}: ${month.toFixed(2)}`)
    .join("\n")
}
