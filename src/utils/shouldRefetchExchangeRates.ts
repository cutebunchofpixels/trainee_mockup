import { Dayjs } from 'dayjs'

import { currencyExchangeStore } from 'src/mobx/currency-exchange'
import { dayjs } from 'src/utils/dayjs'

export function shouldRefetchExchangeRates(startDate: Dayjs, endDate: Dayjs) {
  const loadedStartDate = currencyExchangeStore.startDate
  const loadedEndDate = currencyExchangeStore.endDate
  const exchangeRates = currencyExchangeStore.exchangeRates

  if (exchangeRates.length === 0) {
    return true
  }

  if (endDate.isSame(dayjs(), 'day')) {
    return true
  }

  if (
    !dayjs(startDate).isSameOrAfter(loadedStartDate, 'day') ||
    !dayjs(endDate).isSameOrBefore(loadedEndDate, 'day')
  ) {
    return true
  }

  return false
}
