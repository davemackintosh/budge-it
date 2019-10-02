import { Indexer } from "types/bank"

export const natwest: Indexer = {
  // how many lines at the top of the CSV are junk
  // OR headers?
  skipLines: 3,

  // What column indexes are each piece of data in?
  date: 0,
  type: 1,
  description: 2,
  income: 3,
  outgoing: 3,
  balance: 4,
}
