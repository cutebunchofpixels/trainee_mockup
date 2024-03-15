import React from 'react'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import classNames from './styles.module.scss'
import { Link } from 'react-router-dom'
import SignupForm from 'components/layout/SignupForm'

export default function Signup() {
  const { t } = useTranslation()

  return (
    <Card className={classNames['signup-page']}>
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
