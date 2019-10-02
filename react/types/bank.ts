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
