import React from 'react'
import { Button, Card, Dropdown, MenuProps, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'
import { useAppSelector } from 'redux/app/hooks'

import { Theme } from 'types/Theme'
import RevenueChart from '../RevenueChart'

import styles from './styles.module.scss'

export default function RevenueChartBlock() {
  const { t } = useTranslation()
  const { value: currentTheme } = useAppSelector(state => state.theme)

  const dropdownItems: MenuProps['items'] = [
    {
      label: t('revenueChart.currentWeekOption'),
      key: '1',
    },
    {
      label: t('revenueChart.previousWeekOption'),
      key: '2',
    },
  ]
  return (
    <Card
      title={t('revenueChart.caption')}
      className={styles.chartCard}
      extra={
        <Dropdown menu={{ items: dropdownItems }}>
          <Button type="primary">
            <Space>
              {t('revenueChart.selectInterval')}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      }
    >
      <div
        className={styles.revenueChartContainer}
        dir="ltr"
        style={{
          backgroundColor: currentTheme === Theme.Dark ? '#A9A9A9' : undefined,
        }}
      >
        <RevenueChart />
      </div>
    </Card>
  )
}
