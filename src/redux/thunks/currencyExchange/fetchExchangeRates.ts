import { Dayjs } from 'dayjs'

import { Currency } from 'src/types/Currency'
import { CurrencyExchangeService } from 'src/api/currecny/CurrencyService'
import { AppDispatch } from 'src/redux/app/store'
import {
  currencyExchangeFetchError,
  currencyExchangeFetchStart,
  currencyExchangeFetchSuccess,
} from 'src/redux/actions/currencyExchange'

export function fetchExchangeRates(
  currency: Currency,
  startDate: Dayjs,
  endDate: Dayjs
) {
  return async function (dispatch: AppDispatch) {
    dispatch(currencyExchangeFetchStart())
    try {
      const exchangeRates =
        await CurrencyExchangeService.getExchangeRatesForPeriod(
          currency,
          startDate,
          endDate
        )
      dispatch(
        currencyExchangeFetchSuccess(
          exchangeRates,
          startDate.toISOString(),
          endDate.toISOString()
        )
      )
    } catch (error) {
      dispatch(currencyExchangeFetchError((error as Error).message))
    }
  }
}
