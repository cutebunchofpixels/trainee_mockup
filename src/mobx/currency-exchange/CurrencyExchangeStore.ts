import { Dayjs } from 'dayjs'
import { makeAutoObservable, runInAction } from 'mobx'

import { CurrencyExchangeService } from 'src/api/currecny/CurrencyService'
import { Currency } from 'src/types/models/CurrencyExchange/Currency'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchange/CurrencyExchangeRates'

class CurrencyExchangeStore {
  constructor() {
    makeAutoObservable(this)
  }

  isLoading = false
  exchangeRates: CurrencyExchangeRates[] = []
  error: string | null = null

  get startDate() {
    return this.exchangeRates[0]?.date
  }

  get endDate() {
    return this.exchangeRates.at(-1)?.date
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
