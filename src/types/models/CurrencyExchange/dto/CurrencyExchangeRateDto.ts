import { Currency } from 'src/types/models/CurrencyExchange/Currency'

export type CurrencyExchangeRateDto = { date: string } & {
  [key: string]: {
    [key in Currency]: number
  }
}
