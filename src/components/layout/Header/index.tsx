import React from 'react'
import { Layout } from 'antd'

import ThemeSwitch from '../ThemeSwitch'
import LocaleSelect from '../LocaleSelect'
import CurrentUserSection from '../CurrentUserSection'

import styles from './styles.module.scss'

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <ThemeSwitch />
      <CurrentUserSection />
      <LocaleSelect />
    </Layout.Header>
  )
}
