import React from 'react'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import { Theme } from 'src/types/Theme'
import RevenueChart from 'src/components/layout/RevenueChart'
import ExchangeIntervalDropdown from 'src/components/layout/ExchangeIntervalDropdown'
import { themeStore } from 'src/mobx/theme'

import styles from './styles.module.scss'

function RevenueChartBlock() {
  const { t } = useTranslation()
  const currentTheme = themeStore.theme
  const isChartDataLoading = false

  return (
    <Card
      title={
        <Typography.Text id="chartCaption">
          {t('revenueChart.caption')}
        </Typography.Text>
      }
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

export default observer(RevenueChartBlock)
