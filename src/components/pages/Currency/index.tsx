import React, { useEffect } from 'react'

import PaymentsSection from 'src/components/layout/PaymentsSection'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { Currency as CurrencyEnum } from 'src/types/models/CurrencyExchange/Currency'
import { initialExchangeChartPeriod } from 'src/components/layout/ExchangeIntervalForm'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'

export default function Currency() {
  const dispatch = useAppDispatch()
  const exchangeRates = useAppSelector(state => state.currencyExchange.data)

  useEffect(() => {
    if (exchangeRates.length === 0) {
      dispatch(
        fetchExchangeRates(
          CurrencyEnum.UAH,
          initialExchangeChartPeriod.startDate,
          initialExchangeChartPeriod.endDate
        )
      )
    }
  }, [])

  return <PaymentsSection />
}
