import React from 'react'
import { Card, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import SignupForm, { SignupFormValues } from 'src/components/layout/SignupForm'
import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function Signup() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(_ => navigate('/currency'))
      .catch(error =>
        handleFirebaseError(
          error,
          message => messageApi.error(message),
          key => t(key)
        )
      )
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
