import React from 'react'
import { Layout } from 'antd'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.scss'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <Layout.Footer className={styles.footer}>
      {t('footer.caption')}
    </Layout.Footer>
  )
}
