import {ParsedEntry} from "@budge-types/base"
import {money, monthNames} from "@src/utils"
import blessed, {Widgets} from "blessed"

export function Monthly(entries: ParsedEntry[], _screen: Widgets.Screen): Widgets.Node {
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const averages = entries.reduce((monthly: number[], entry: ParsedEntry): number[] => {
    const month = entry.date.getMonth()
    monthly[month] += entry.difference
    return monthly
  }, months)

  return blessed.box({
    content: averages
      .map((month: number, index: number): string => `${monthNames[index]}: ${money(month)}`)
      .join("\n"),
    tags: true,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: 'magenta',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'green'
      }
    }
  })
}
