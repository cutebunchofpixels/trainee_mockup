import React from 'react'
import { Card, Typography } from 'antd'
import classNames from './styles.module.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SignupForm from 'components/layout/SignupForm'

export default function Signin() {
  const { t } = useTranslation()

  return (
    <Card className={classNames['signin-page']}>
      <SignupForm handleSubmit={values => console.log(values)} />
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/auth/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
