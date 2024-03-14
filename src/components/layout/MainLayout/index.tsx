import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import classNames from './styles.module.scss'
import Header from '../Header'

export default function MainLayout() {
  return (
    <Layout className={classNames['main-layout']}>
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
