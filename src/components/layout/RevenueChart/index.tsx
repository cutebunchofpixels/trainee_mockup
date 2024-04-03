import React, { useMemo } from 'react'
import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'

import { dayjs } from 'src/utils/dayjs'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchange/CurrencyExchangeRates'
import { Currency } from 'src/types/models/CurrencyExchange/Currency'

import styles from './styles.module.scss'

const mockExchangeRates: CurrencyExchangeRates[] = [
  {
    date: '2024-04-01',
    currency: Currency.UAH,
    exchangeRates: {
      uah: 1,
      eur: 0.023584706,
      usd: 0.02563804,
    },
  },
  {
    date: '2024-04-02',
    currency: Currency.UAH,
    exchangeRates: {
      uah: 1,
      eur: 0.022584706,
      usd: 0.02463804,
    },
  },
  {
    date: '2024-04-03',
    currency: Currency.UAH,
    exchangeRates: {
      uah: 1,
      eur: 0.021584706,
      usd: 0.02363804,
    },
  },
  {
    date: '2024-04-04',
    currency: Currency.UAH,
    exchangeRates: {
      uah: 1,
      eur: 0.020584706,
      usd: 0.02263804,
    },
  },
]

export default function RevenueChart() {
  const { t, i18n } = useTranslation()
  const exchangeRates = mockExchangeRates
  const isLoading = false

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
      <ContainerSkeleton active>
        <LineChartOutlined className={styles.chartLoadingIcon} />
      </ContainerSkeleton>
    )
  }

  if (exchangeRates.length === 0) {
    return <Empty className={styles.chartEmptyMessage} />
  }

  return <DualAxes {...chartConfig} />
}
