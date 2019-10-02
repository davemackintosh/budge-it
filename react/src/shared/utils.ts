import { ParsedCsvEntry, PostType } from "types/csv"
import { Indexer } from "types/bank"
import { GraphPropsData } from "types/graph"

/* eslint-disable @typescript-eslint/no-explicit-any */
const memoCache: Record<string, any> = {}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * memoize a function to speed up it's execution
 * in future by skipping it entirely and reading
 * from a cache.
 *
 * @generic <ReturnType> the return type of the callback.
 * @param {Function} callback to wrap.
 * @return {ReturnType}
 */
export function memo<ReturnType>(callback: Function) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (...args: any[]): ReturnType => {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    const key = JSON.stringify(args)

    if (key in memoCache) return memoCache[key]

    const valueToCache = callback(...args)
    memoCache[key] = valueToCache
    return valueToCache
  }
}

/**
 * Normalise a number to 0.0 to 1.0.
 *
 * @param {number} value to normalise
 * @param {number} min - minimum possible value.
 * @param {number} max - maximum possible value.
 * @returns {number} normalised number between 0.0 and 1.0
 */
export const normalise = memo<number>(
  (value: number, min: number, max: number): number =>
    (value - min) / (max - min),
)

/**
 * Parse a CSV file into a ParsedCsvEntry array
 * for processing by the individual reports.
 *
 * @param {File} csvFile to parse.
 * @returns {Promise<ParsedCsvEntry[]> a parsed CSV.
 */
export async function parseCsvFile(
  csvFile: File,
  indexer: Indexer,
): Promise<ParsedCsvEntry[]> {
  return new Promise((resolve, reject): void => {
    const fileReader = new FileReader()

    fileReader.onload = (reader): void => {
      if (reader.target === null)
        throw new TypeError(
          "We failed to read your bank statement for some reason, try downloading it again and then uploading here. We'll wait for you.",
        )
      Promise.resolve(reader.target.result)
        .then((result: string | ArrayBuffer | null) => {
          if (result === null)
            throw new TypeError(
              "We failed to read your bank statement for some reason, try downloading it again and then uploading here. We'll wait for you.",
            )

          return result.toLocaleString()
        })
        .then((statement: string): string[] =>
          statement.split("\n").slice(indexer.skipLines),
        )
        .then((entries: string[]): string[][] =>
          entries.map((entry: string): string[] => {
            let openSpeech = false
            const out: string[] = []
            let word = ""

            for (
              let charIndex = 0, max = entry.length;
              charIndex < max;
              charIndex += 1
            ) {
              if (entry[charIndex] === '"') {
                openSpeech = !openSpeech
              }

              if (entry[charIndex] === "," && !openSpeech) {
                out.push(word)
                word = ""
              } else {
                word += entry[charIndex]
              }
            }

            return out
          }),
        )
        .then((probableEntries: string[][]): string[][] =>
          probableEntries.filter(
            (entry: string[]): boolean => entry.length > 0,
          ),
        )
        .then((entries: string[][]): string[][] => {
          if (indexer.balance) {
            entries.unshift([
              new Date().toLocaleString(),
              "OPENING-BALANCE",
              "OPENING-BALANCE",
              entries[0][indexer.balance],
            ])
          }
          return entries
        })
        .then((entries: string[][]): ParsedCsvEntry[] =>
          entries.map(
            (entry: string[]): ParsedCsvEntry => {
              const [day, month, year] = entry[indexer.date]
                .split(/[\/,]/g)
                .map(Number)
              const baseEntry: ParsedCsvEntry = {
                date: new Date(year, month, day).valueOf(),
                type: entry[indexer.type] as PostType,
                description: entry[indexer.description],
                difference: 0,
              }

              // If the income is 0 then the bank
              // failed to validate the income at
              // all so we dont care either way.
              // we can also assume; safely, this
              // entry is actually an expenditure.
              //
              // also Number("") === 0
              //   and
              // isNaN("") === false
              // in JavaScript.
              //
              // also "-1" < 0 === true
              //   and
              // "1" > 0 === true
              //
              // Cast to any and then cast to number,
              // this basically tells TypeScript that
              // "I know what I'm doing, trust me"
              /* eslint-disable @typescript-eslint/no-explicit-any */
              if (((entry[indexer.income] as any) as number) > 0) {
                baseEntry.difference = Number(entry[indexer.income])
              } else if (((entry[indexer.outgoing] as any) as number) < 0) {
                baseEntry.difference = Number(entry[indexer.outgoing])
              }
              /* eslint-enable @typescript-eslint/no-explicit-any */

              if (typeof indexer.balance !== "undefined") {
                baseEntry.balance = Number(entry[indexer.balance])
              }
              return baseEntry
            },
          ),
        )
        .then(resolve)
        .catch(reject)
    }

    fileReader.readAsText(csvFile)
  })
}

export const monthNames = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

/* eslint-disable @typescript-eslint/camelcase */
export const currencyMap = {
  en_GB: "GBP",
  en_US: "USD",
}
/* eslint-enable @typescript-eslint/camelcase */

/**
 * @TODO Work out language from the browser/request.
 * Format the amount into the local format
 * specified by the LANG environmental variable.
 *
 * if no process.env.LANG present. will default to "en_GB".
 *
 * @param {number} amount - the number to format.
 * @returns {string} locale formatted version of amount.
 * @example ```javascript
 * import {money} from "./utils"
 *
 * console.log(money(165983)) // -> £165,983.00
 * ```
 */
export function money(amount: number): string {
  const lang = (process.env.LANG || "en_GB").replace(
    /_(\w+)/gi,
    (match: string) => match.toUpperCase(),
  )
  const langValue = lang.split(".")[0]
  return Number(amount).toLocaleString(langValue.replace("_", "-"), {
    style: "currency",
    currency: currencyMap[langValue as keyof typeof currencyMap] || "GBP",
  })
}

export const csvAsAxisData = memo<GraphPropsData[]>(
  (parsedCsvFile: ParsedCsvEntry[]): GraphPropsData[] => {
    console.log(parsedCsvFile)
    return parsedCsvFile.map(row => ({
      x: row.date,
      y: row.difference,
    }))
  },
)
