import {ParsedEntry} from "../types/base"
import {money} from "../utils"

export interface MatcherConfig {
  label: string
  matcher: RegExp
  necessary?: boolean
}

export interface MatchedEntry {
  total: number
  numberOfEntries: number
}

export interface OutwardMatchedEntries {
  [label: string]: MatchedEntry
}

/**
 * these matchers are executed in the order they appear.
 * if a match occurs it stops iterating this list and moves onto the next entry.
 * the necessary fkag is simply a flag for logging
 * whether or not we think this expenditure can
 * be eliminated from daily life and save your money.
 * the necessary flag should be taken with a pinch of salt wince you could be going to the supermarket for groceries to feed your kids or to get a 20 pack of White Lightning.
 */
export const matchers: MatcherConfig[] = [
  {
    label: "deliveroo",
    matcher: /deliveroo/gi,
  },
  {
    label: "nationwide",
    matcher: /nationwide/gi,
    necessary: true,
  },
  {
    label: "tesco",
    matcher: /tesco/gi,
    necessary: true,
  },
  {
    label: "ocado",
    matcher: /ocado/gi,
    necessary: true,
  },
  {
    label: "paypal",
    matcher: /paypal/gi,
  },
  {
    label: "unmatched",
    matcher: /^.*$/,
  },
]

export function MatchersByMonth(entries: ParsedEntry[]) {
  const months: OutwardMatchedEntries[] = []
  let savings = 0
  let totalUnnecessarySpends = 0

  const entriesByMonth = entries.reduce((out: OutwardMatchedEntries[], entry: ParsedEntry): OutwardMatchedEntries[] => {
    const month = entry.date.getMonth()

    for (let matcher of matchers) {
      if (matcher.matcher.test(entry.description)) {
        if (!months[month]) {
          months[month] = {
            [matcher.label]: {
              total: Math.abs(entry.difference),
              numberOfEntries: 1,
            }
          }
        }
        else if (!months[month][matcher.label]) {
          months[month][matcher.label] = {
            total: Math.abs(entry.difference),
            numberOfEntries: 1,
          }
        }
        else {
          months[month][matcher.label] = {
            ...months[month][matcher.label],
            total: months[month][matcher.label].total + Math.abs(entry.difference),
            numberOfEntries: months[month][matcher.label].numberOfEntries += 1,
          }
        }
        console.log(matcher.label, entry.difference)
        if (!matcher.necessary && matcher.label !== "unmatched") {
          savings += Math.abs(entry.difference)
          totalUnnecessarySpends += 1
        }

        break
      }
    }

    return out
  }, months)

  return `Monthly breakdown of where the money goes.\nunnecessary spends ${totalUnnecessarySpends} totalling ${money(savings)} in missed savings.\n`
}
