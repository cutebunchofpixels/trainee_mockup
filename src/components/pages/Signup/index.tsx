import React from 'react'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import SignupForm from 'components/layout/SignupForm'

import styles from './styles.module.scss'

export default function Signup() {
  const { t } = useTranslation()

  return (
    <Card className={styles.signupPage}>
      <SignupForm handleSubmit={values => console.log(values)} />
      <Typography.Paragraph className="create-new-account-message">
        {t('signup.accountExistsMessage')}{' '}
        <Link to="/auth/signin">
          {t('signup.loginWithExisginAccountMessage')}
        </Link>
      </Typography.Paragraph>
    </Card>
  )
}
