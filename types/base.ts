export type PostType = "D/D" | "POS"

export interface ParsedEntry {
  date: Date
  type: PostType
  balance: number
  description: string
  difference: number
}

export type PostProcessor = (parsedEntries: ParsedEntry[]) => string

