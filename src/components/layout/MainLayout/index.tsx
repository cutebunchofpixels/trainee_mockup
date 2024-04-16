import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'
import Loader from 'src/components/ui/Loader'

import styles from './styles.module.scss'

export default function MainLayout() {
  return (
    <Layout>
      <Header />
      <Layout.Content className={styles.content}>
        <Suspense fallback={<Loader size="large" />}>
          <Outlet />
        </Suspense>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}
