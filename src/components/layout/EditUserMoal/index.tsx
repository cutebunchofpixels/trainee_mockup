import React, { useEffect, useState } from 'react'
import { Modal, ModalProps, message } from 'antd'
import { useTranslation } from 'react-i18next'

import EditUserForm, {
  EditUserFormValues,
} from 'src/components/layout/EditUserForm'
import { GorestUser } from 'src/types/models/User'
import { UserService } from 'src/api/users/UsersService'
import { userStore } from 'src/mobx/users'

import styles from './styles.module.scss'

interface EditUserModalProps extends ModalProps {
  userId: number | null
  handleOk: () => void
}

export default function EditUserModal({
  open,
  userId,
  handleOk,
  ...rest
}: EditUserModalProps) {
  const { t } = useTranslation()
  const [user, setUser] = useState<GorestUser | undefined>(undefined)

  async function handleSubmit(values: EditUserFormValues) {
    try {
      await UserService.update(userId!, values)
      userStore.invalidate()
      message.success(t('editUser.success'))
      setUser(undefined)
      handleOk()
    } catch (error) {
      message.error(t('errors.unexpected'))
    }
  }

  useEffect(() => {
    if (!userId) {
      return
    }

    if (!user) {
      UserService.getById(userId)
        .then(user => {
          setUser(user)
        })
        .catch(() => {
          message.error(t('errors.unexpected'))
        })
    }
  }, [userId, user])

  return (
    <Modal
      title={t('editUser.pageHeading')}
      className={styles.editUserModal}
      open={open}
      footer={null}
      {...rest}
    >
      <EditUserForm user={user} key={userId} handleSubmit={handleSubmit} />
    </Modal>
  )
}
