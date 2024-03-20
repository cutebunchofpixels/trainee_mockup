import React from 'react'
import { Button, message } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { auth } from 'fb'
import { googleAuthProvider } from 'fb/googleAuth'
import { handleFirebaseError } from 'utils/handleFirebaseError'

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
      icon={<GoogleOutlined />}
      onClick={handleGoogleSignin}
      className={styles.googleSigninButton}
    >
      Google
    </Button>
  )
}
