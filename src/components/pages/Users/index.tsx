import React, { useEffect } from 'react'
import { Typography } from 'antd'

import UsersTable from 'src/components/layout/UsersTable'
import UsersFilters from 'src/components/layout/UsersFilters'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.scss'
import { mockUsers } from 'src/components/layout/UsersTable/mockUsers'

export default function Users() {
  const users = mockUsers
  const { t } = useTranslation()

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
