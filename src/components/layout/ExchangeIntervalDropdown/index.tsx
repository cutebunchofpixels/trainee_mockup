import React from 'react'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'

import { dayjs } from 'src/utils/dayjs'
import { useAppDispatch } from 'src/redux/app/hooks'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'
import { Currency } from 'src/types/Currency'
import { shouldRefetchExchangeRates } from 'src/utils/shouldRefetchExchangeRates'

enum DropdownOption {
  CurrentWeek = 'currentWeek',
  PreviousWeek = 'previousWeek',
}

export default function ExchangeIntervalDropdown() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const dropdownItems: MenuProps['items'] = [
    {
      label: t('revenueChart.currentWeekOption'),
      key: DropdownOption.CurrentWeek,
    },
    {
      label: t('revenueChart.previousWeekOption'),
      key: DropdownOption.PreviousWeek,
    },
  ]

  return (
    <Dropdown
      menu={{
        items: dropdownItems,
        onClick: params => {
          const key = params.key as DropdownOption

          let startDate = dayjs().subtract(5, 'day')
          let endDate = dayjs()

          if (key === DropdownOption.PreviousWeek) {
            startDate = dayjs().subtract(1, 'week').startOf('week')
            endDate = startDate.add(5, 'd')
          }

          if (shouldRefetchExchangeRates(startDate, endDate)) {
            dispatch(fetchExchangeRates(Currency.UAH, startDate, endDate))
          }
        },
      }}
    >
      <Button type="primary">
        <Space>
          {t('revenueChart.selectInterval')}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
