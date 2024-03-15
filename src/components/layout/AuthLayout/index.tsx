import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Header from '../Header'

import styles from './styles.module.scss'

export default function AuthLayout() {
  return (
    <Layout className={styles.authLayout}>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
