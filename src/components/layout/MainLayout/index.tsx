import { Layout } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import './styles.module.scss'
import Header from '../Header'

export default function MainLayout() {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </Layout>
  )
}
