import React from 'react'
import { Typography } from 'antd'

import EditUserForm from 'src/components/layout/EditUserForm'
import { mockUsers } from 'src/components/layout/UsersTable/mockUsers'

import styles from './styles.module.scss'

export default function EditUser() {
  return (
    <div className={styles.editUserPageContainer}>
      <Typography.Title>Edit user</Typography.Title>
      <EditUserForm
        user={mockUsers[0]}
        handleSubmit={values => console.log(values)}
      />
    </div>
  )
}
