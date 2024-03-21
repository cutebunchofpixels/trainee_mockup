import axios from 'axios'
import { Dayjs } from 'dayjs'

import { CurrencyExchangeRateDto } from 'src/types/dto/CurrencyExchangeRateDto'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'
import { Currency } from 'src/types/Currency'

export class CurrencyExchangeService {
  private static axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_CURRENCY_API_URL,
  })

  static async getExchangeRates(
    currency: Currency,
    date: Dayjs
  ): Promise<CurrencyExchangeRates> {
    const resp = await this.axiosInstance.get<CurrencyExchangeRateDto>(
      `currency-api@${date.format(
        'YYYY-MM-DD'
      )}/v1/currencies/${currency}.min.json`
    )

    return {
      date: date,
      currency: currency,
      exchangeRates: resp.data[currency],
    }
  }

  static async getExchangeRatesForPeriod(
    currency: Currency,
    startDate: Dayjs,
    endDate: Dayjs
  ) {
    const difference = endDate.diff(startDate, 'days')
    console.log(difference)
    const promises: Promise<CurrencyExchangeRates>[] = []

    for (let i = 0; i <= difference; i++) {
      promises.push(this.getExchangeRates(currency, startDate.add(i, 'day')))
    }

    return Promise.all(promises)
  }
}
