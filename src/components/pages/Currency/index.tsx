import React, { useEffect } from 'react'

import PaymentsSection from 'src/components/layout/PaymentsSection'
import { Currency as CurrencyEnum } from 'src/types/models/CurrencyExchange/Currency'
import { initialExchangeChartPeriod } from 'src/components/layout/ExchangeIntervalForm'

export default function Currency() {
  return <PaymentsSection />
}
