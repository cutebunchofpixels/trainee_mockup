import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'

import styles from './styles.module.scss'

export default function MainLayout() {
  return (
    <Layout className={styles.mainLayout}>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}
