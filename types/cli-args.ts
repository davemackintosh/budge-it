import {AvailableBanks, AvailableReporters} from "@budge-types/base"
import {Argv} from "yargs"

export interface CLIArgs extends Argv {
  csv: string
  bank: AvailableBanks
  reporters: AvailableReporters[]
}
