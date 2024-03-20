import React from 'react'
import { Card, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

import SignupForm, { SignupFormValues } from 'components/layout/SignupForm'
import { auth } from 'fb'
import { googleAuthProvider } from 'fb/googleAuth'
import { handleFirebaseError } from 'utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function Signin() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    signInWithEmailAndPassword(auth, email, password)
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
    <Card className={styles.signinPage}>
      {contextHolder}
      <SignupForm
        handleSubmit={handleFormSubmit}
        submitButtonCaptionKey="auth.login"
        handleGoogleSignin={handleGoogleSignin}
      />
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
