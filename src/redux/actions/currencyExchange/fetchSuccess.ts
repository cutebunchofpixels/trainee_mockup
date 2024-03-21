import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'

export type CurrencyExchangeFetchSuccess = {
  type: 'currencyExchange/fetchSuccess'
  payload: CurrencyExchangeRates[]
}

export function currencyExchangeFetchSuccess(
  currencyExchangeRates: CurrencyExchangeRates[]
): CurrencyExchangeFetchSuccess {
  return {
    type: 'currencyExchange/fetchSuccess',
    payload: currencyExchangeRates,
  }
}
