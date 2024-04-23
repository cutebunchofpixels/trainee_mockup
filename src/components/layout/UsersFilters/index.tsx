import React, { useMemo } from 'react'
import { Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { Gender } from 'src/types/models/User'
import { getEnumOptions } from 'src/utils/getEnumOptions'
import { userStore } from 'src/mobx/users'

import styles from './styles.module.scss'

export default function UsersFilters() {
  const { t, i18n } = useTranslation()

  function handleGenderChange(value: string) {
    if (value === 'all') {
      userStore.setFilters({ gender: undefined })
    } else {
      userStore.setFilters({ gender: value as Gender })
    }
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
      <Typography.Text id="filtersCaption">
        {t('users.filterByGender')}
      </Typography.Text>
      <Select
        options={genderOptions}
        defaultValue="all"
        onChange={handleGenderChange}
        aria-labelledby="filtersCaption"
        showSearch
      />
    </div>
  )
}
