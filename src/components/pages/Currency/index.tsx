import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import PaymentsSection from 'src/components/layout/PaymentsSection'
import { Currency as CurrencyEnum } from 'src/types/models/CurrencyExchange/Currency'
import { initialExchangeChartPeriod } from 'src/components/layout/ExchangeIntervalForm'
import { currencyExchangeStore } from 'src/mobx/currency-exchange'

const { startDate, endDate } = initialExchangeChartPeriod

function Currency() {
  const exchangeRates = currencyExchangeStore.exchangeRates

  useEffect(() => {
    if (exchangeRates.length === 0) {
      currencyExchangeStore.fetchExchangeRates(
        CurrencyEnum.UAH,
        startDate,
        endDate
      )
    }
  }, [])

  return <PaymentsSection />
}

export default observer(Currency)
