import React, { useMemo } from 'react'
import { DualAxes } from '@ant-design/plots'
import { useTranslation } from 'react-i18next'

interface ChartItem {
  year: number
  sales: number
  revenue: number
}
const chartData: ChartItem[] = []

for (let i = 0; i < 20; i++) {
  const initialYear = 2010

  chartData.push({
    year: initialYear + i,
    revenue: 1000 + Math.random() * 1000,
    sales: 50 + Math.random() * 20,
  })
}

export default function RevenueChart() {
  const { t, i18n } = useTranslation()

  const chartConfig = useMemo(() => {
    const config = {
      xField: 'year',
      data: chartData,
      tooltip: false,
      legend: false,

      children: [
        {
          type: 'line',
          yField: 'sales',
          style: {
            lineWidth: 2,
            stroke: '#F6CECB',
          },
          axis: {
            y: {
              position: 'right',
              title: t('revenueChart.salesAxis'),
            },
          },
        },
        {
          type: 'line',
          yField: 'revenue',
          style: {
            lineWidth: 2,
            stroke: '#6CD0F8',
          },
          axis: {
            y: {
              title: t('revenueChart.revenueAxis'),
              labelFormatter: (label: string) => `$${label}`,
            },
          },
        },
      ],
    }

    return config
  }, [i18n.resolvedLanguage])

  return <DualAxes {...chartConfig} />
}
