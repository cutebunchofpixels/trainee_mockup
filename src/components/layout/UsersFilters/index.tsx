import React, { useMemo } from 'react'
import { Select, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { Gender } from 'src/types/models/User'
import { useAppDispatch } from 'src/redux/app/hooks'
import { fetchUsers } from 'src/redux/thunks/users'

import styles from './styles.module.scss'

export default function UsersFilters() {
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()

  function handleGenderChange(value: string) {
    if (value === 'all') {
      dispatch(fetchUsers())
    } else {
      dispatch(fetchUsers({ gender: value as Gender }))
    }
  }

  const genderOptions = useMemo(
    () => [
      {
        value: 'all',
        label: t('all'),
      },
      ...Object.values(Gender).map(gender => ({
        value: gender,
        label: t(`gender.${gender}`),
      })),
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
