import React, { useEffect, useState } from 'react'
import { Typography, message } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import EditUserForm, {
  EditUserFormValues,
} from 'src/components/layout/EditUserForm'
import { GorestUser } from 'src/types/models/User'
import { UserService } from 'src/api/users/UsersService'

import styles from './styles.module.scss'

type RoutePararms = {
  userId: string
}

export default function EditUser() {
  const [user, setUser] = useState<GorestUser | undefined>(undefined)
  const { t } = useTranslation()
  const { userId } = useParams<RoutePararms>()
  const navigate = useNavigate()

  function handleSubmit(values: EditUserFormValues) {
    UserService.update(userId!, values)
      .then(() => {
        navigate('/users')
        message.success(t('editUser.success'))
      })
      .catch(() => message.error(t('errors.unexpected')))
  }

  useEffect(() => {
    if (!userId) {
      navigate('*')
      return
    }

    if (!user) {
      UserService.getById(userId)
        .then(setUser)
        .catch(error => {
          if (!(error instanceof AxiosError)) {
            message.error(t('errors.unexpected'))
          }

          if (error.response?.status === 404) {
            navigate('/*')
          }
        })
    }
  }, [user])

  return (
    <div className={styles.editUserPageContainer}>
      <Typography.Title>{t('editUser.pageHeading')}</Typography.Title>
      <EditUserForm user={user} handleSubmit={handleSubmit} />
    </div>
  )
}
