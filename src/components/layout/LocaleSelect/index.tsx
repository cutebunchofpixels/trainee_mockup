import React from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { Locale } from 'src/types/Locale'

import styles from './styles.module.scss'

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
      className={styles.localeSelect}
      onChange={locale => i18n.changeLanguage(locale)}
    />
  )
}
