import React, { useEffect } from 'react'
import { Typography } from 'antd'

import UsersTable from 'src/components/layout/UsersTable'
import UsersFilters from 'src/components/layout/UsersFilters'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { fetchUsers } from 'src/redux/thunks/users'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.scss'

export default function Users() {
  const users = useAppSelector(state => state.users.data)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers())
    }
  }, [])

  return (
    <div className={styles.usersPageContainer}>
      <Typography.Title className={styles.pageHeading}>
        {t('users.pageHeading')}
      </Typography.Title>
      <UsersFilters />
      <UsersTable />
    </div>
  )
}