import {readFile} from "fs"
import {PostType, ParsedEntry, PostProcessor, Indexer} from "./types/base"
import {TotalSpending} from "./functions/total-spending"
import {Monthly} from "./functions/monthly-averages"
import {MatchersByMonth} from "./functions/matchers"
import bankIndexes from "./bank-indexes"
import chalk from 'chalk';

const loggers: PostProcessor[] = [
  TotalSpending,
  Monthly,
  MatchersByMonth,
]

if (process.argv.length === 2) {
  console.log(`${chalk.bold.underline("Usage:")}
budge-it ${chalk.italic("my-bank-statement.csv natwest|halifax|hsbc")}
`)
  process.exit(-1)
}

const inputCSV = process.argv[2] || "./bank-statement.csv"
const skipLines = process.argv[3] 
  ? Number(process.argv[3]) 
  : 0

const indexes: Indexer = bankIndexes[(process.argv[4] || "natwest") as string]

new Promise<string>((resolve, reject) =>
  readFile(inputCSV, (err: any, buffer: Buffer) => {
    if (err) return reject(err)

    return resolve(buffer.toString())
  })
)
  .then((statement: string) => statement.split("\n").slice(skipLines))
  .then((entries: string[]): string[][] => entries.map((entry: string): string[] => {
      let openSpeech = false
      let out: string[] = []
      let word = ""

    for (let charIndex = 0, max = entry.length; charIndex < max; charIndex += 1) {
      if (entry[charIndex] === "\"") {
        openSpeech = !openSpeech
      }

      if (entry[charIndex] === "," && !openSpeech) {
        out.push(word)
        word = ""
      }
      else {
        word += entry[charIndex]
      }
    }

    return out
  }))
  .then((probableEntries: string[][]) => probableEntries.filter((entry: string[]) => entry.length > 0))
  .then((entries: string[][]) => {
    if (indexes.balance) {
      entries.unshift([
        new Date().toLocaleString(),
        "OPENING-BALANCE",
        "OPENING-BALANCE",
        entries[0][indexes.balance],
      ])
    }
    return entries
  })
  .then((entries: string[][]) => entries.map((entry: string[]): ParsedEntry => {
    const baseEntry: ParsedEntry = {
      date: new Date(entry[indexes.date]),
      type: entry[indexes.type] as PostType,
      description: entry[indexes.description],
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
    if (((entry[indexes.income] as any) as number) > 0) {
      baseEntry.difference = Number(entry[indexes.income])
    }
    else if (((entry[indexes.outgoing] as any) as number) < 0) {
      baseEntry.difference = Number(entry[indexes.outgoing])
    }

    if (typeof indexes.balance !== "undefined") {
      baseEntry.balance = Number(entry[indexes.balance])
    }
    return baseEntry
  }
  ))
  .then((parsedEntries: ParsedEntry[]) => {
    loggers.forEach((logger: PostProcessor) => console.log("%s\n", logger(parsedEntries)))
    console.log(`Made by Dave Mackintosh\nhttps://twitter.com/daveymackintosh\nhttps://github.com/davemackintosh\n❤`)
  })
  .catch((err: any) => {
    console.error(err)
    console.log("FUCK!")
    process.exit(-1)
  })
