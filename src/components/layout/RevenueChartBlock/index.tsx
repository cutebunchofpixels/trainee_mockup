import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import { Theme } from 'src/types/Theme'
import RevenueChart from 'src/components/layout/RevenueChart'
import { useAppSelector } from 'src/redux/app/hooks'
import ExchangeIntervalDropdown from 'src/components/layout/ExchangeIntervalDropdown'

import styles from './styles.module.scss'

export default function RevenueChartBlock() {
  const { t } = useTranslation()
  const { value: currentTheme } = useAppSelector(state => state.theme)
  const isChartDataLoading = useAppSelector(
    state => state.currencyExchange.loading
  )

  return (
    <Card
      title={t('revenueChart.caption')}
      className={styles.chartCard}
      extra={<ExchangeIntervalDropdown />}
    >
      <div
        className={styles.revenueChartContainer}
        dir="ltr"
        style={{
          backgroundColor: currentTheme === Theme.Dark ? '#A9A9A9' : undefined,
          padding: isChartDataLoading ? '10px' : '0',
        }}
      >
        <RevenueChart />
      </div>
    </Card>
  )
}
