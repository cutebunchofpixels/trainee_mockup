import React from 'react'
import { Card, Typography, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Helmet } from 'react-helmet'

import SignupForm, { SignupFormValues } from 'src/components/layout/SignupForm'
import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'
import Link from 'src/components/ui/Link'

import styles from './styles.module.scss'

export default function Signup() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  function handleFormSubmit({ email, password }: SignupFormValues) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/currency'))
      .catch(error =>
        handleFirebaseError(
          error,
          message => messageApi.error(message),
          key => t(key)
        )
      )
  }

  return (
    <Card title={t('pages.signup')} className={styles.signupPage}>
      <Helmet>
        <title>{t('title', { page: t('pages.signup') })}</title>
      </Helmet>
      {contextHolder}
      <SignupForm
        handleSubmit={handleFormSubmit}
        submitButtonCaption={t('register', { ns: 'common' })}
      />
      <Link to="/signin" className={styles.useExistingAccount}>
        {t('signup.useExistingAccount')}
      </Link>
    </Card>
  )
}
