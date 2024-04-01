import React from 'react'
import { Typography } from 'antd'

import UsersTable from 'src/components/layout/UsersTable'

import styles from './styles.module.scss'
import UsersFilters from 'src/components/layout/UsersFilters'

export default function Users() {
  return (
    <div className={styles.usersPageContainer}>
      <Typography.Title className={styles.pageHeading}>Users</Typography.Title>
      <UsersFilters />
      <UsersTable />
    </div>
  )
}
