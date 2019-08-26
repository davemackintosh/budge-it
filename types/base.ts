import {Widgets} from "blessed"
export type PostType = "OPENING-BALANCE" | "D/D" | "POS"
export type AvailableBanks = "natwest" | "hsbc" | "halifax"
export type AvailableReporters = "monthly-averages" | "missed-savings"

export interface ParsedEntry {
  date: Date
  type: PostType
  balance?: number
  description: string
  difference: number
}

export type PostProcessor = (parsedEntries: ParsedEntry[], screen: Widgets.Screen) => Widgets.Node

export interface Indexer {
  date: number
  type: number
  description: number
  income: number
  outgoing: number

  /**
   * Not all banks provide a running balance column
   * so this is an optional on this interface.
   */
  balance?: number

  /**
   * Some banks export their CSV statements with
   * a bunch of junk, blank lines and headers at
   * the top of the file. we dont care about them
   */
  skipLines?: number
}

export interface Indexers {
  natwest: Indexer
  hsbc: Indexer
  halifax: Indexer
}
