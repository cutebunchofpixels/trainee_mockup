import React from 'react'
import { Card, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import SignupForm from 'components/layout/SignupForm'

import styles from './styles.module.scss'

export default function Signin() {
  const { t } = useTranslation()

  return (
    <Card className={styles.signinPage}>
      <SignupForm handleSubmit={values => console.log(values)} />
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
