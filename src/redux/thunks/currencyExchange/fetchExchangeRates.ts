import { Dayjs } from 'dayjs'

import { Currency } from 'src/types/Currency'
import { CurrencyService } from 'src/api/currecy/CurrencyService'
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
      const exchangeRates = await CurrencyService.getExchangeRateForPeriod(
        currency,
        startDate,
        endDate
      )
      dispatch(currencyExchangeFetchSuccess(exchangeRates))
    } catch (error) {
      dispatch(currencyExchangeFetchError((error as Error).message))
    }
  }
}
