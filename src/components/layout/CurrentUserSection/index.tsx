import React from 'react'
import { Avatar, Button, Typography, message, theme } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import { signOut } from 'firebase/auth'

import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'
import CurrentUserPopover from 'src/components/layout/CurrentUserPopover'
import { mockUser } from 'src/utils/mockUser'

import styles from './styles.module.scss'

export default function CurrentUserSection() {
  const user = mockUser
  const [messageApi, contextHolder] = message.useMessage()
  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ minWidth: token.screenSM })
  const { t } = useTranslation()

  function handleSignout() {
    signOut(auth).catch(error =>
      handleFirebaseError(
        error,
        message => messageApi.error(message),
        key => t(key)
      )
    )
  }

  if (!user) {
    return null
  }

  if (isScreenMd) {
    return (
      <div className={styles.currentUserSection}>
        {contextHolder}
        <Avatar
          icon={!user.photoURL && <UserOutlined />}
          src={user.photoURL && <img src={user.photoURL} alt="User avatar" />}
        />
        <Typography.Text>
          {user.displayName ? user.displayName : user.email}
        </Typography.Text>
        <Button
          shape="circle"
          icon={<LogoutOutlined />}
          onClick={handleSignout}
          className={styles.signoutButton}
        />
      </div>
    )
  }

  return (
    <div className={styles.currentUserSection}>
      <Avatar
        icon={!user.photoURL && <UserOutlined />}
        src={user.photoURL && <img src={user.photoURL} alt="User avatar" />}
      />
      <CurrentUserPopover handleSignout={handleSignout} />
    </div>
  )
}
