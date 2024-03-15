import React from 'react'
import ThemeSwitch from '../ThemeSwitch'
import LocaleSelect from '../LocaleSelect'
import { Layout } from 'antd'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <Layout.Header className={styles.header}>
      <ThemeSwitch />
      <LocaleSelect />
    </Layout.Header>
  )
}
