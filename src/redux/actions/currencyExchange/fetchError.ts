export type CurrencyExchangeFetchError = {
  type: 'currencyExchange/fetchError'
  payload: string
}

export function currencyExchangeFetchError(
  errorMessage: string
): CurrencyExchangeFetchError {
  return {
    type: 'currencyExchange/fetchError',
    payload: errorMessage,
  }
}
