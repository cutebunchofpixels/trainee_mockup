import React from 'react'
import { Modal, ModalProps } from 'antd'
import { useTranslation } from 'react-i18next'

import EditUserForm from 'src/components/layout/EditUserForm'

import styles from './styles.module.scss'

interface EditUserModalProps extends ModalProps {
  userId: number
  submitCallback?: () => void
}

export default function EditUserModal({
  open,
  userId,
  submitCallback,
  ...rest
}: EditUserModalProps) {
  const { t } = useTranslation()

  return (
    <Modal
      title={t('editUser.pageHeading')}
      className={styles.editUserModal}
      open={open}
      footer={null}
      {...rest}
    >
      <EditUserForm
        userId={userId}
        key={userId}
        submitCallback={submitCallback}
      />
    </Modal>
  )
}
