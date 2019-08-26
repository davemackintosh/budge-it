import {AvailableBanks} from '@budge-types/base';

export interface CLIArgs {
  csv: string
  bank: AvailableBanks
  reporters: string[]
}
