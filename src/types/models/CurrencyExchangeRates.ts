import { Currency } from 'src/types/Currency'

export interface CurrencyExchangeRates {
  currency: Currency
  date: string
  exchangeRates: {
    [key in Currency]: number
  }
}
