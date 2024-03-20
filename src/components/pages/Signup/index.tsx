import React from 'react'
import { Card, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import SignupForm, { SignupFormValues } from 'components/layout/SignupForm'
import { auth } from 'fb'
import { googleAuthProvider } from 'fb/googleAuth'
import { handleFirebaseError } from 'utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function Signup() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(_ => navigate('/data'))
      .catch(error =>
        handleFirebaseError(
          error,
          message => messageApi.error(message),
          key => t(key)
        )
      )
  }

  function handleGoogleSignin() {
    signInWithPopup(auth, googleAuthProvider)
      .then(() => navigate('/data'))
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
        handleGoogleSignin={handleGoogleSignin}
      />
      <Typography.Paragraph className="create-new-account-message">
        {t('signup.accountExistsMessage')}{' '}
        <Link to="/signin">{t('signup.loginWithExisginAccountMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
