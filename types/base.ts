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
  
  /**
   * Natwest keeps a running track of your balance
   * next to the difference field in the CSV.
   * HSBC doesn't do this so this is an optional
   * field on the indexer.
   */
  balance?: number
}

export interface Indexers {
  [bankName: string]: Indexer
}
