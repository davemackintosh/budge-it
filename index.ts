import {readFile} from "fs"
import {PostType, ParsedEntry, PostProcessor, Indexer, AvailableBanks} from "./types/base"
import {TotalSpending} from "@functions/total-spending"
import {Monthly} from "@functions/monthly-averages"
import {MatchersByMonth} from "@functions/matchers"
import bankIndexes from "@banks"
//import chalk from "chalk"
import yargs, {Argv} from "yargs"
import {CLIArgs} from '@budge-types/cli-args';

const argv: Argv<CLIArgs> = yargs
  .option("csv", {
    alias: "c",
    description: "The path to your CSV",
    type: "string"
  })
  .option("bank", {
    alias: "b",
    description: "What bank is this statement from? natwest, hsbc or halifax?",
    type: "string"
  })
  .option("reporters", {
    alias: "r",
    description: "What reports do you want to see?",
    type: "string",
    default: "all",
  })
  .demandOption("csv")
  .demandOption("bank")
  .epilogue(`Made by Dave Mackintosh\nhttps://twitter.com/daveymackintosh\nhttps://github.com/davemackintosh\n❤`)
  .argv

const loggers: PostProcessor[] = [
  TotalSpending,
  Monthly,
  MatchersByMonth,
]

const indexes: Indexer = bankIndexes[argv.bank as AvailableBanks]

new Promise<string>((resolve, reject) =>
  readFile(argv.csv, (err: any, buffer: Buffer) => {
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
    console.log()
  })
  .catch((err: any) => {
    console.error(err)
    console.log("FUCK!")
    process.exit(-1)
  })
