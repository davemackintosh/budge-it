import React from "react"
import { ParsedCsvEntry } from "types/csv"

export interface CSVContextValue {
  setParsedCsv?: (parsedCsvFile: ParsedCsvEntry[]) => void
  parsedCsvFile: ParsedCsvEntry[]
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export const CSVContext = React.createContext<CSVContextValue>({
  parsedCsvFile: [],
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
})
export const CSVProvider = CSVContext.Provider
export const CSVConsumer = CSVContext.Consumer
