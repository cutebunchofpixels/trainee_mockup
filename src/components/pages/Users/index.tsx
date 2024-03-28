import React from 'react'
import { Typography } from 'antd'

import UsersTable from 'src/components/layout/UsersTable'

import styles from './styles.module.scss'

export default function Users() {
  return (
    <div className={styles.usersPageContainer}>
      <Typography.Title>Users</Typography.Title>
      <UsersTable />
    </div>
  )
}
