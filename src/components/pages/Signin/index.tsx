import React from 'react'
import { Card, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signInWithEmailAndPassword } from 'firebase/auth'

import SignupForm, { SignupFormValues } from 'src/components/layout/SignupForm'
import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function Signin() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    signInWithEmailAndPassword(auth, email, password)
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
    <Card className={styles.signinPage}>
      {contextHolder}
      <SignupForm
        handleSubmit={handleFormSubmit}
        submitButtonCaption={t('login', { ns: 'common' })}
      />
      <Typography.Paragraph className="create-new-account-message">
        {t('signin.noAccoutMessage') + ' '}
        <Link to="/signup">{t('signin.createNewAccoutMessage')}</Link>
      </Typography.Paragraph>
    </Card>
  )
}
