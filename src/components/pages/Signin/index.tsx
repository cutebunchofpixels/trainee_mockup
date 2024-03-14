import React from 'react'
import { Button, Card, Divider, Typography } from 'antd'
import SigninForm from 'components/layout/SigninForm'
import './styles.modules.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Signin() {
  const { t } = useTranslation()

  return (
    <Card>
      <SigninForm
        handleError={error => console.log(error)}
        handleSubmit={values => console.log(values)}
      />
      <Divider>{t('auth.dividerCaption')}</Divider>
      <Button icon={<GoogleOutlined />}>Google</Button>
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/auth/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
