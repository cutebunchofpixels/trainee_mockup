import { Layout } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from './styles.module.scss'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <Layout.Footer className={classNames['footer']}>
      {t('footer.caption')}
    </Layout.Footer>
  )
}
