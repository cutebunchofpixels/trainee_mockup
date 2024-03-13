import React from 'react'
import heIL from 'antd/locale/he_IL'
import enUS from 'antd/locale/en_US'
import { Locale } from 'types/Locale'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

const localeOptions = Object.values(Locale).map(locale => ({
  label: locale.toUpperCase(),
  value: locale,
}))

export default function LocaleSelect() {
  const { i18n } = useTranslation()

  return (
    <Select
      defaultValue={Locale.English}
      options={localeOptions}
      onChange={locale => i18n.changeLanguage(locale)}
    />
  )
}
