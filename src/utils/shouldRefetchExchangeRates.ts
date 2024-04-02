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
    !dayjs(startDate).isSameOrAfter(currencyExchange.startDate, 'day') ||
    !dayjs(endDate).isSameOrBefore(currencyExchange.endDate, 'day')
  ) {
    console.log('bruuuuuuuuh')
    console.log(
      !dayjs(currencyExchange.startDate).isSameOrAfter(startDate, 'day')
    )
    console.log(!dayjs(currencyExchange.endDate).isSameOrBefore(endDate, 'day'))
    return true
  }

  return false
}
