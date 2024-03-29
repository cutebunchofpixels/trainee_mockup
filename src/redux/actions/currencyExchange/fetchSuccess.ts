import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchange/CurrencyExchangeRates'

export type CurrencyExchangeFetchSuccess = {
  type: 'currencyExchange/fetchSuccess'
  payload: {
    exchangeRates: CurrencyExchangeRates[]
    startDate: string
    endDate: string
  }
}

export function currencyExchangeFetchSuccess(
  exchangeRates: CurrencyExchangeRates[],
  startDate: string,
  endDate: string
): CurrencyExchangeFetchSuccess {
  return {
    type: 'currencyExchange/fetchSuccess',
    payload: { exchangeRates, startDate, endDate },
  }
}
