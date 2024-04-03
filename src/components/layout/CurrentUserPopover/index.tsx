import React from 'react'
import { Button, Divider, Popover, Typography } from 'antd'
import { CaretDownFilled, UserDeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { mockUser } from 'src/utils/mockUser'

import styles from './styles.module.scss'

export default function CurrentUserPopover({
  handleSignout,
}: {
  handleSignout: () => void
}) {
  const { t } = useTranslation()
  const user = mockUser

  if (!user) {
    return null
  }

  return (
    <Popover
      trigger="click"
      overlayClassName={styles.currentUserPopover}
      content={
        <>
          <Typography.Paragraph>
            {t('auth.loggedAs')} <b>{user.displayName || user.email}</b>
          </Typography.Paragraph>
          <Divider />
          <Button onClick={handleSignout} icon={<UserDeleteOutlined />}>
            {t('signout', { ns: 'common' })}
          </Button>
        </>
      }
    >
      <Button
        shape="circle"
        ghost
        type="primary"
        style={{ border: 'none', color: '#FFF' }}
        icon={<CaretDownFilled />}
        size="small"
      />
    </Popover>
  )
}
