import React from 'react'
import { Button, message } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { auth } from 'src/fb'
import { googleAuthProvider } from 'src/fb/googleAuth'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function GoogleSigninButton() {
  const navigate = useNavigate()
  const [messageApi] = message.useMessage()
  const { t } = useTranslation()

  function handleGoogleSignin() {
    signInWithPopup(auth, googleAuthProvider)
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
    <Button
      htmlType="button"
      aria-label="Signin with Google"
      icon={<GoogleOutlined aria-hidden />}
      onClick={handleGoogleSignin}
      className={styles.googleSigninButton}
    >
      Google
    </Button>
  )
}
