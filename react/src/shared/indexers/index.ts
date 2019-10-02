import { Indexer } from "types/bank"
import { halifax } from "./halifax"
import { natwest } from "./natwest"
import { hsbc } from "./hsbc"

const banks: Record<string, Indexer> = {
  halifax,
  natwest,
  hsbc,
}

export default banks
