import React, { useMemo } from 'react'
import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
import { Empty, Skeleton } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'

import { useAppSelector } from 'src/redux/app/hooks'
import { dayjs } from 'src/utils/dayjs'

import styles from './styles.module.scss'

export default function RevenueChart() {
  const { t, i18n } = useTranslation()
  const exchangeRates = useAppSelector(state => state.currencyExchange.data)
  const isLoading = useAppSelector(state => state.currencyExchange.loading)

  const chartData = useMemo(() => {
    return exchangeRates.map(item => ({
      date: item.date,
      uahToUsd: 1 / item.exchangeRates.usd,
      uahToEur: 1 / item.exchangeRates.eur,
    }))
  }, [exchangeRates])

  const chartConfig = useMemo(() => {
    const config = {
      xField: 'date',
      data: chartData,
      tooltip: false,
      legend: false,

      children: [
        {
          type: 'line',
          yField: 'uahToUsd',
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
              title: t('revenueChart.uahToUsdAxis'),
            },
          },
        },
        {
          type: 'line',
          yField: 'uahToEur',
          style: {
            lineWidth: 2,
            stroke: '#6CD0F8',
          },
          axis: {
            y: {
              title: t('revenueChart.uahToUsdAxis'),
            },
          },
        },
      ],
    }

    return config
  }, [i18n.resolvedLanguage, exchangeRates])

  if (isLoading) {
    return (
      <Skeleton.Node active className={styles.chartLoadingSkeleton}>
        <LineChartOutlined />
      </Skeleton.Node>
    )
  }

  if (exchangeRates.length === 0) {
    return <Empty className={styles.chartEmptyMessage} />
  }

  return <DualAxes {...chartConfig} />
}
