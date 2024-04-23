import React from 'react'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import EditUserForm from 'src/components/layout/EditUserForm'

import styles from './styles.module.scss'

export type RoutePararms = {
  userId: string
}

export default function EditUser() {
  const { t } = useTranslation()
  const { userId } = useParams<RoutePararms>()
  const navigate = useNavigate()

  return (
    <div className={styles.editUserPageContainer}>
      <Helmet>
        <title>{t('title', { page: t('pages.editUser') })}</title>
      </Helmet>
      <Typography.Title>{t('editUser.pageHeading')}</Typography.Title>
      <Card className={styles.formContainer}>
        <EditUserForm
          userId={Number(userId)}
          submitCallback={() => navigate('/users')}
        />
      </Card>
    </div>
  )
}
