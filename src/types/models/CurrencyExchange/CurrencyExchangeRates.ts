import { Currency } from 'src/types/models/CurrencyExchange/Currency'

export interface CurrencyExchangeRates {
  currency: Currency
  date: string
  exchangeRates: {
    [key in Currency]: number
  }
}
