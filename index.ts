import { readFile } from "fs"
import {
  PostType,
  ParsedEntry,
  PostProcessor,
  Indexer,
  AvailableBanks,
} from "./types/base"
import { TotalSpending } from "@functions/total-spending"
import { Monthly } from "@functions/monthly-averages"
import { MatchersByMonth } from "@functions/matchers"
import bankIndexes from "@banks"
//import chalk from "chalk"
import yargs from "yargs"
import { CLIArgs } from "@budge-types/cli-args"
import blessed, { Widgets } from "blessed"

const screen = blessed.screen()
const argv: CLIArgs = yargs
  .scriptName("budge-it")
  .option("csv", {
    alias: "c",
    description: "The path to your CSV",
    type: "string",
  })
  .option("bank", {
    alias: "b",
    description: "What bank is this statement from? natwest, hsbc or halifax?",
    type: "string",
  })
  .option("reporters", {
    alias: "r",
    description: "What reports do you want to see?",
    type: "string",
    default: "all",
  })
  .demandOption("csv")
  .demandOption("bank")
  .epilogue(
    `Made by Dave Mackintosh\nhttps://twitter.com/daveymackintosh\nhttps://github.com/davemackintosh\n❤`,
  )
  .help().argv

const loggers: PostProcessor[] = [TotalSpending, Monthly, MatchersByMonth]

const indexer: Indexer = bankIndexes[argv.bank as AvailableBanks]

new Promise<string>((resolve, reject): void =>
  readFile(argv.csv, (err: any, buffer: Buffer): void => {
    if (err) return reject(err)

    return resolve(buffer.toString())
  }),
)
  .then((statement: string): string[] =>
    statement.split("\n").slice(indexer.skipLines),
  )
  .then((entries: string[]): string[][] =>
    entries.map((entry: string): string[] => {
      let openSpeech = false
      let out: string[] = []
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
    probableEntries.filter((entry: string[]): boolean => entry.length > 0),
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
  .then((entries: string[][]): ParsedEntry[] =>
    entries.map(
      (entry: string[]): ParsedEntry => {
        const baseEntry: ParsedEntry = {
          date: new Date(entry[indexer.date]),
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
        if (((entry[indexer.income] as any) as number) > 0) {
          baseEntry.difference = Number(entry[indexer.income])
        } else if (((entry[indexer.outgoing] as any) as number) < 0) {
          baseEntry.difference = Number(entry[indexer.outgoing])
        }

        if (typeof indexer.balance !== "undefined") {
          baseEntry.balance = Number(entry[indexer.balance])
        }
        return baseEntry
      },
    ),
  )
  .then((parsedEntries: ParsedEntry[]): void => {
    const nodes = loggers.map(
      (logger: PostProcessor): Widgets.Node => logger(parsedEntries, screen),
    )

    // Add all the reporters.
    nodes.forEach((node: Widgets.Node): void => screen.append(node))
  })
  .catch((err: any): void => {
    console.error(err)
    console.log("FUCK!")
    process.exit(-1)
  })
