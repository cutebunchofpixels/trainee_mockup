import React, { Suspense } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer'
import Header from '../Header'

import styles from './styles.module.scss'
import Loader from 'src/components/ui/Loader'

export default function MainLayout() {
  return (
    <Layout className={styles.mainLayout}>
      <Suspense fallback={<Loader />}>
        <Header />
        <Layout.Content>
          <Outlet />
        </Layout.Content>
        <Footer />
      </Suspense>
    </Layout>
  )
}
