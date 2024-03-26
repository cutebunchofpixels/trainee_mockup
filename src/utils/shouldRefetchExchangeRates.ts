import { Dayjs } from 'dayjs'

import { dayjs } from 'src/utils/dayjs'
import { store } from 'src/redux/app/store'

export function shouldRefetchExchangeRates(startDate: Dayjs, endDate: Dayjs) {
  const { currencyExchange } = store.getState()

  if (currencyExchange.data.length === 0) {
    return true
  }

  if (endDate.isSame(dayjs(), 'day')) {
    return true
  }

  if (
    !dayjs(currencyExchange.startDate).isSame(startDate, 'day') ||
    !dayjs(currencyExchange.endDate).isSame(endDate, 'day')
  ) {
    return true
  }

  return false
}
