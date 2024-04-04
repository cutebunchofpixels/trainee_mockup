import React, { useMemo } from 'react'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { DownOutlined } from '@ant-design/icons'

import { currencyExchangeStore } from 'src/mobx/currency-exchange'

enum DropdownOption {
  CurrentWeek = 'currentWeek',
  PreviousWeek = 'previousWeek',
}

export default function ExchangeIntervalDropdown() {
  const { t, i18n } = useTranslation()

  const dropdownItems: MenuProps['items'] = useMemo(
    () => [
      {
        label: t('revenueChart.currentWeekOption'),
        key: DropdownOption.CurrentWeek,
      },
      {
        label: t('revenueChart.previousWeekOption'),
        key: DropdownOption.PreviousWeek,
      },
    ],
    [i18n.resolvedLanguage]
  )

  return (
    <Dropdown
      menu={{
        items: dropdownItems,
        onClick: ({ key }) => {
          key === DropdownOption.CurrentWeek
            ? currencyExchangeStore.setToCurrentWeek()
            : currencyExchangeStore.setToPreviousWeek()
        },
      }}
    >
      <Button type="primary">
        <Space>
          {t('interval', { ns: 'common' })}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
