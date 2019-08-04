import {readFile} from "fs"
import {PostType, ParsedEntry, PostProcessor} from "./types/base"
import {TotalSpending} from "./functions/total-spending"
import {Monthly} from "./functions/monthly-averages"

const loggers: PostProcessor[] = [
  TotalSpending,
  Monthly,
]

const inputCSV = process.argv[2] || "./Regular-20190803.csv"
const skipLines = process.argv[3] 
  ? Number(process.argv[3]) 
  : 3

const indexes = {
  date: 0,
  type: 1,
  description: 2,
  difference: 3,
  balance: 4,
}

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
    entries.unshift([
      new Date().toLocaleString(),
      "OPENING-BALANCE",
      "OPENING-BALANCE",
      entries[0][indexes.balance],
    ])
    console.log(entries[0])
    return entries
  })
  .then((entries: string[][]) => entries.map((entry: string[]): ParsedEntry => {
    return ({
      date: new Date(entry[indexes.date]),
      type: entry[indexes.type] as PostType,
      balance: Number(entry[indexes.balance]),
      description: entry[indexes.description],
      difference: Number(entry[indexes.difference]),
    })
  }
  ))
  .then((parsedEntries: ParsedEntry[]) => {
    loggers.forEach((logger: PostProcessor) => console.log("%s\n", logger(parsedEntries)))
  })
  .catch((err: any) => {
    console.error(err)
    console.log("FUCK!")
    process.exit(-1)
  })
