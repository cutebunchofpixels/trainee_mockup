import React from 'react'
import { Avatar, Button, Typography, message } from 'antd'
import { UserDeleteOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signOut } from 'firebase/auth'

import { useAppSelector } from 'src/redux/app/hooks'
import { auth } from 'src/fb'
import { handleFirebaseError } from 'src/utils/handleFirebaseError'

import styles from './styles.module.scss'

export default function CurrentUserSection() {
  const user = useAppSelector(state => state.auth.user)
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleSignout() {
    signOut(auth)
      .then(() => navigate('/signin'))
      .catch(error =>
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
        icon={<UserDeleteOutlined />}
        onClick={handleSignout}
        className={styles.signoutButton}
      />
    </div>
  )
}
