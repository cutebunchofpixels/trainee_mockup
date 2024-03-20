import { Currency } from 'types/Currency'

export type CurrencyExchangeRateDto = { date: string } & {
  [key: string]: {
    [key in Currency]: number
  }
}
