import {Widget} from "blessed"
export type PostType = "OPENING-BALANCE" | "D/D" | "POS"
export type AvailableBanks = "natwest" | "hsbc" | "halifax"

export interface ParsedEntry {
  date: Date
  type: PostType
  balance?: number
  description: string
  difference: number
}

export type PostProcessor = (parsedEntries: ParsedEntry[], screen: Widget.Screen) => Widget.Node

export interface Indexer {
  date: number
  type: number
  description: number
  income: number
  outgoing: number
  balance?: number
}

export interface Indexers {
  natwest: Indexer
  hsbc: Indexer
  halifax: Indexer
}
