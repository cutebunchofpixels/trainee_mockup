import React, { useMemo } from 'react'
import { Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { Gender } from 'src/types/models/User'
import { getEnumOptions } from 'src/utils/getEnumOptions'

import styles from './styles.module.scss'

export default function UsersFilters() {
  const { t, i18n } = useTranslation()

  function handleGenderChange(value: string) {
    console.log('gender change')
  }

  const genderOptions = useMemo(
    () => [
      {
        value: 'all',
        label: t('all', { ns: 'common' }),
      },
      ...getEnumOptions(Gender, gender => t(`gender.${gender}`)),
    ],
    [i18n.resolvedLanguage]
  )

  return (
    <div className={styles.userFilters}>
      <Typography.Text>{t('users.filterByGender')}</Typography.Text>
      <Select
        options={genderOptions}
        defaultValue="all"
        onChange={handleGenderChange}
      />
    </div>
  )
}
