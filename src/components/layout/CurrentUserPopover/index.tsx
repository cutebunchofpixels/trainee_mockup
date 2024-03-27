import React from 'react'
import { Button, Divider, Popover, Typography } from 'antd'
import { CaretDownFilled, UserDeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from 'src/redux/app/hooks'

import styles from './styles.module.scss'

export default function CurrentUserPopover({
  handleSignout,
}: {
  handleSignout: () => void
}) {
  const { t } = useTranslation()
  const user = useAppSelector(state => state.auth.user)

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
            {t('auth.signout')}
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
