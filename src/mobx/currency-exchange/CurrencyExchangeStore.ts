import dayjs, { Dayjs } from 'dayjs'
import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { CurrencyExchangeService } from 'src/api/currecny/CurrencyService'
import { Currency } from 'src/types/models/CurrencyExchange/Currency'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchange/CurrencyExchangeRates'
import { shouldRefetchExchangeRates } from './shouldRefetchExchangeRates'

const BASE_CURRENCY = Currency.UAH
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
  error: string | null = null

  async initStore() {
    await this.fetchExchangeRates(BASE_CURRENCY, this.startDate, this.endDate)
  }

  get isEmpty() {
    return this.exchangeRates.length === 0
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

currencyExchangeStore.initStore()

reaction(
  () => ({
    startDate: currencyExchangeStore.startDate,
    endDate: currencyExchangeStore.endDate,
  }),
  ({ startDate, endDate }, prev) => {
    const { startDate: prevStartDate, endDate: prevEndDate } = prev

    if (
      shouldRefetchExchangeRates(startDate, endDate, prevStartDate, prevEndDate)
    ) {
      currencyExchangeStore.fetchExchangeRates(
        BASE_CURRENCY,
        startDate,
        endDate
      )
    }
  }
)
