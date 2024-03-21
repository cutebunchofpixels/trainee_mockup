import { Dayjs } from 'dayjs'
import { Currency } from 'src/types/Currency'

export interface CurrencyExchangeRates {
  currency: Currency
  date: Dayjs
  exchangeRates: {
    [key in Currency]: number
  }
}
