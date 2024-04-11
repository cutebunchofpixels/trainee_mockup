import dayjs, { Dayjs } from 'dayjs'
import { autorun, makeAutoObservable, runInAction } from 'mobx'

import { CurrencyExchangeService } from 'src/api/currecny/CurrencyService'
import { Currency } from 'src/types/models/CurrencyExchange/Currency'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchange/CurrencyExchangeRates'
import { shouldRefetchExchangeRates } from './shouldRefetchExchangeRates'

export const MIN_EXCHANGE_INTERVAL = 3
export const MAX_EXCHANGE_INTERVAL = 5

class CurrencyExchangeStore {
  constructor() {
    makeAutoObservable(this)
  }

  exchangeRates: CurrencyExchangeRates[] = []
  startDate: Dayjs = dayjs().subtract(1, 'week').startOf('week')
  endDate: Dayjs = this.startDate.add(MAX_EXCHANGE_INTERVAL - 1, 'day')
  isLoading = false
  count = 20
  error: string | null = null

  get isEmpty() {
    return this.exchangeRates.length === 0
  }

  get loadedStartDate() {
    return this.exchangeRates.at(0)?.date
  }

  get loadedEndDate() {
    return this.exchangeRates.at(-1)?.date
  }

  setInterval(startDate: Dayjs, endDate: Dayjs) {
    this.startDate = startDate
    this.endDate = endDate
  }

  setToPreviousWeek() {
    this.startDate = dayjs().subtract(1, 'week').startOf('week')
    this.endDate = this.startDate.add(MAX_EXCHANGE_INTERVAL - 1, 'day')
  }

  setToCurrentWeek() {
    this.startDate = dayjs().subtract(MAX_EXCHANGE_INTERVAL - 1, 'day')
    this.endDate = dayjs()
  }

  setCount(value: number) {
    this.count = value
  }

  async fetchExchangeRates(
    currency: Currency,
    startDate: Dayjs,
    endDate: Dayjs
  ) {
    this.isLoading = true

    try {
      const exchangeRates =
        await CurrencyExchangeService.getExchangeRatesForPeriod(
          currency,
          startDate,
          endDate
        )

      runInAction(() => {
        this.exchangeRates = exchangeRates
        this.error = null
      })
    } catch (error) {
      runInAction(() => {
        this.exchangeRates = []
        this.error = (error as Error).message
      })
    }

    runInAction(() => {
      this.isLoading = false
    })
  }
}

export const currencyExchangeStore = new CurrencyExchangeStore()

autorun(() => {
  const { startDate, endDate } = currencyExchangeStore
  const loadedStartDate = currencyExchangeStore.loadedStartDate
  const loadedEndDate = currencyExchangeStore.loadedEndDate

  if (
    shouldRefetchExchangeRates(
      startDate,
      endDate,
      loadedStartDate,
      loadedEndDate
    )
  ) {
    currencyExchangeStore.fetchExchangeRates(Currency.UAH, startDate, endDate)
  }
})
