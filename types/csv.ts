export type PostType = "OPENING-BALANCE" | "D/D" | "POS"

export interface ParsedCsvEntry {
  date: number
  type: PostType
  balance?: number
  description: string
  difference: number
}
