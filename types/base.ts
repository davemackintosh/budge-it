export type PostType = "OPENING-BALANCE" | "D/D" | "POS"

export interface ParsedEntry {
  date: Date
  type: PostType
  balance?: number
  description: string
  difference: number
}

export type PostProcessor = (parsedEntries: ParsedEntry[]) => string

export interface Indexer {
  date: number
  type: number
  description: number
  income: number
  outgoing: number
  balance?: number
}

export interface Indexers {
  [bankName: string]: Indexer
}
