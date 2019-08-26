import {ParsedEntry} from "@budge-types/base"
import {money} from "@src/utils"
import blessed, {Widgets} from "blessed"

interface Totals {
  income: number
  spending: number
}

export function TotalSpending(entries: ParsedEntry[], _screen: Widgets.Screen): Widgets.Node {
  const totals = entries
    .reduce((total: Totals, entry: ParsedEntry): Totals => {
      if (entry.difference > 0)
        total.income += entry.difference
      else
        total.spending -= entry.difference

      return total
    }, {income: 0, spending: 0})

  return blessed.box({
    content: `Totals:\n\t{red spent in this period: ${money(totals.spending)}}\n\t{green income: ${money(totals.income)}}\n\tDifference: ${money(totals.income - totals.spending)}. `,
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
