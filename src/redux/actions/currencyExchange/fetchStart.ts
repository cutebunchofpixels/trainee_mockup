export type CurrencyExchangeFetchStart = {
  type: 'currencyExchange/fetchStart'
}

export function currencyExchangeFetchStart(): CurrencyExchangeFetchStart {
  return {
    type: 'currencyExchange/fetchStart',
  }
}
