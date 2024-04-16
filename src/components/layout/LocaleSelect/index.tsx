import React, { useMemo } from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { Locale } from 'src/types/Locale'

import styles from './styles.module.scss'

export default function LocaleSelect() {
  const { i18n, t } = useTranslation()

  const localeOptions = useMemo(
    () =>
      Object.values(Locale).map(locale => ({
        label: t(locale, { ns: 'common' }),
        value: locale,
      })),
    [i18n.resolvedLanguage]
  )

  return (
    <Select
      aria-label="Choose a language"
      key={i18n.resolvedLanguage}
      defaultValue={i18n.resolvedLanguage}
      options={localeOptions}
      className={styles.localeSelect}
      onChange={locale => i18n.changeLanguage(locale)}
    />
  )
}
