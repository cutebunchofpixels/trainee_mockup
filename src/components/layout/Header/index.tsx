import React from 'react'
import { Layout, Button, message } from 'antd'
import { signOut } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ThemeSwitch from '../ThemeSwitch'
import LocaleSelect from '../LocaleSelect'
import { auth } from 'src/fb'
import { useAppSelector } from 'src/redux/app/hooks'

import styles from './styles.module.scss'

export default function Header() {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)
  const { t } = useTranslation()

  function handleSignout() {
    signOut(auth)
      .then(() => navigate('/signin'))
      .catch(error => {
        if (error instanceof FirebaseError) {
          messageApi.error(error.message)
        } else {
          messageApi.error('Unexpected error occured')
        }
      })
  }

  return (
    <Layout.Header className={styles.header}>
      {contextHolder}
      <ThemeSwitch />
      <LocaleSelect />
      {user && (
        <Button type="primary" onClick={handleSignout}>
          {t('auth.signout')}
        </Button>
      )}
    </Layout.Header>
  )
}
