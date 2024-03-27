import React, { useEffect } from 'react'

import PaymentsSection from 'src/components/layout/PaymentsSection'
import { useAppDispatch } from 'src/redux/app/hooks'
import { Currency as CurrencyEnum } from 'src/types/Currency'
import { initialExchangeChartPeriod } from 'src/components/layout/ExchangeIntervalForm'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'

export default function Currency() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchExchangeRates(
        CurrencyEnum.UAH,
        initialExchangeChartPeriod.startDate,
        initialExchangeChartPeriod.endDate
      )
    )
  }, [])

  return <PaymentsSection />
}
