import React, { useMemo, useRef } from 'react'
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
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null)

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

  function handleSelect(key: DropdownOption) {
    if (key === DropdownOption.CurrentWeek) {
      currencyExchangeStore.setToCurrentWeek()
    } else {
      currencyExchangeStore.setToPreviousWeek()
    }

    dropdownTriggerRef.current?.focus()
  }

  return (
    <Dropdown
      menu={{
        items: dropdownItems,
        onClick: ({ key }) => handleSelect(key as DropdownOption),
      }}
      trigger={['click']}
    >
      <Button type="primary" ref={dropdownTriggerRef}>
        <Space>
          {t('interval', { ns: 'common' })}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  )
}
