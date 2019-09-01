import { ParsedEntry } from "@budge-types/base"
import { money } from "@src/utils"
import blessed, { Widgets } from "blessed"

interface Totals {
  income: number
  spending: number
}

export function TotalSpending(
  entries: ParsedEntry[],
  _screen: Widgets.Screen,
  layout: Widgets.LayoutElement,
): Widgets.Node {
  const totals = entries.reduce(
    (total: Totals, entry: ParsedEntry): Totals => {
      if (entry.difference > 0) total.income += entry.difference
      else total.spending -= entry.difference

      return total
    },
    { income: 0, spending: 0 },
  )

  return blessed.box({
    parent: layout,
    width: "98%",
    height: 6,
    content: `Totals:\n\t{red-fg}{bold} spent in this period: ${money(
      totals.spending,
    )}{/}\n\t{green-fg} income: ${money(totals.income)}{/}\n\n\tDifference: ${money(
      totals.income - totals.spending,
    )}. `,
    tags: true,
    style: {
      fg: "white",
    },
  })
}
