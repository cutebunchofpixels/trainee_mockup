import React from 'react'
import { Card, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Helmet } from 'react-helmet'

import SignupForm, { SignupFormValues } from 'src/components/layout/SignupForm'
import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'
import Link from 'src/components/ui/Link'

import styles from './styles.module.scss'

export default function Signin() {
  const { t } = useTranslation()
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  function handleFormSubmit({ email, password }: SignupFormValues) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate(from || '/currency'))
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
      <Helmet>
        <title>{t('title', { page: t('pages.signin') })}</title>
      </Helmet>
      <SignupForm
        handleSubmit={handleFormSubmit}
        submitButtonCaption={t('login', { ns: 'common' })}
      />
      <Link to="/signup" className={styles.createNewAccount}>
        {t('signin.createNewAccount')}
      </Link>
    </Card>
  )
}
