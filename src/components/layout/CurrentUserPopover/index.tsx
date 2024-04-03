import React from 'react'
import { Button, Divider, Popover, Typography } from 'antd'
import { CaretDownFilled, UserDeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import styles from './styles.module.scss'
import { authStore } from 'src/mobx/auth'

function CurrentUserPopover({ handleSignout }: { handleSignout: () => void }) {
  const { t } = useTranslation()
  const user = authStore.user

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

export default observer(CurrentUserPopover)
