import { Currency } from 'src/types/Currency'

export type CurrencyExchangeRateDto = { date: string } & {
  [key: string]: {
    [key in Currency]: number
  }
}
