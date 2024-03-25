import React, { useMemo } from 'react'
import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
import { dayjs } from 'src/utils/dayjs'
import { Empty, Skeleton } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'

import { useAppSelector } from 'src/redux/app/hooks'

import styles from './styles.module.scss'

export default function RevenueChart() {
  const { t, i18n } = useTranslation()
  const currencyExchangeRates = useAppSelector(
    state => state.currencyExchange.data
  )

  const isChartDataLoading = useAppSelector(
    state => state.currencyExchange.loading
  )

  const chartData = useMemo(() => {
    return currencyExchangeRates.map(item => ({
      date: item.date,
      eurToUsd: item.exchangeRates.usd,
      usdToEur: 1 / item.exchangeRates.usd,
    }))
  }, [currencyExchangeRates])

  const chartConfig = useMemo(() => {
    const config = {
      xField: 'date',
      data: chartData,
      tooltip: false,
      legend: false,

      children: [
        {
          type: 'line',
          yField: 'usdToEur',
          style: {
            lineWidth: 2,
            stroke: '#F6CECB',
          },
          axis: {
            x: {
              labelFormatter: (label: string) =>
                dayjs(label).format('YYYY-MM-DD'),
            },
            y: {
              position: 'right',
              title: t('revenueChart.usdToEurAxis'),
            },
          },
        },
        {
          type: 'line',
          yField: 'eurToUsd',
          style: {
            lineWidth: 2,
            stroke: '#6CD0F8',
          },
          axis: {
            y: {
              title: t('revenueChart.eurToUsdAxis'),
            },
          },
        },
      ],
    }

    return config
  }, [i18n.resolvedLanguage, currencyExchangeRates])

  if (isChartDataLoading) {
    return (
      <Skeleton.Node active className={styles.chartLoadingSkeleton}>
        <LineChartOutlined />
      </Skeleton.Node>
    )
  }

  if (currencyExchangeRates.length === 0) {
    return <Empty className={styles.chartEmptyMessage} />
  }

  return <DualAxes {...chartConfig} />
}
