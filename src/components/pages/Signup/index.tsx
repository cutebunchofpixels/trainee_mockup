import React from 'react'
import { Card, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import SignupForm, { SignupFormValues } from 'components/layout/SignupForm'
import { auth } from 'fb'

import styles from './styles.module.scss'

export default function Signup() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(_ => navigate('/data'))
      .catch(error => {
        if (error instanceof FirebaseError) {
          messageApi.error(error.message)
        } else {
          messageApi.error('Unexpected error occured')
        }
      })
  }

  return (
    <Card className={styles.signupPage}>
      {contextHolder}
      <SignupForm
        handleSubmit={handleFormSubmit}
        submitButtonCaptionKey="auth.register"
      />
      <Typography.Paragraph className="create-new-account-message">
        {t('signup.accountExistsMessage')}{' '}
        <Link to="/signin">{t('signup.loginWithExisginAccountMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
