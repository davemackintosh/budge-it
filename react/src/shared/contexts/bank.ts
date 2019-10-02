import React from "react"
import { natwest } from "@src/shared/indexers/natwest"
import { Indexer } from "types/bank"

interface BankContextValue {
  setIndexer?: (indexer: Indexer) => void
  indexer: Indexer
}

export const BankContext = React.createContext<BankContextValue>({
  indexer: natwest,
})
export const BankProvider = BankContext.Provider
export const BankConsumer = BankContext.Consumer
