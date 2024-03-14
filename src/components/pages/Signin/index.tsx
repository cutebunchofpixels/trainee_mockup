import React from 'react'
import { Button, Card, Divider, Typography } from 'antd'
import SigninForm from 'components/layout/SigninForm'
import classNames from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Signin() {
  const { t } = useTranslation()

  return (
    <Card className={classNames['signin-page']}>
      <SigninForm
        handleError={error => console.log(error)}
        handleSubmit={values => console.log(values)}
      />
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/auth/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
