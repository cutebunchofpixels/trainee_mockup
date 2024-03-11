import React from 'react'
import { DualAxes, DualAxesConfig } from '@ant-design/plots'

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

const chartConfig: DualAxesConfig = {
  xField: 'year',
  data: chartData,
  tooltip: false,
  legend: {
    color: {
      itemMarkerStroke: ({ label }: { label: string }) => {
        if (label === 'revenue') {
          return '#6CD0F8'
        }

        return '#F6CECB'
      },
    },
  },

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
          title: 'Sales',
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
          title: 'Revenue',
          labelFormatter: (label: string) => `$${label}`,
        },
      },
    },
  ],
}

export default function RevenueChart() {
  return <DualAxes {...chartConfig} />
}
