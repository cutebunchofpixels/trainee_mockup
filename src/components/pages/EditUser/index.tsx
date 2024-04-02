import React from 'react'
import { Typography } from 'antd'

import EditUserForm from 'src/components/layout/EditUserForm'
import { mockUsers } from 'src/components/layout/UsersTable/mockUsers'

import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

export default function EditUser() {
  const { t } = useTranslation()

  return (
    <div className={styles.editUserPageContainer}>
      <Typography.Title>{t('editUser.pageHeading')}</Typography.Title>
      <EditUserForm
        user={mockUsers[0]}
        handleSubmit={values => console.log(values)}
      />
    </div>
  )
}
