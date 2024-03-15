import React from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { Locale } from 'types/Locale'
import { ls } from 'utils/secureLS'
import { SELECTED_LOCALE_KEY } from 'utils/constants'

const localeOptions = Object.values(Locale).map(locale => ({
  label: locale.toUpperCase(),
  value: locale,
}))

export default function LocaleSelect() {
  const { i18n } = useTranslation()

  return (
    <Select
      defaultValue={i18n.resolvedLanguage}
      options={localeOptions}
      onChange={locale => {
        i18n.changeLanguage(locale)
        ls.set(SELECTED_LOCALE_KEY, locale)
        document.documentElement.setAttribute('lang', locale)
      }}
    />
  )
}
