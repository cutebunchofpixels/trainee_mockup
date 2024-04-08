import { Dayjs } from 'dayjs'

import { currencyExchangeStore } from 'src/mobx/currency-exchange'
import { dayjs } from 'src/utils/dayjs'

export function shouldRefetchExchangeRates(
  startDate: Dayjs,
  endDate: Dayjs,
  loadedStartDate: Dayjs,
  loadedEndDate: Dayjs
) {
  if (currencyExchangeStore.isEmpty) {
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
