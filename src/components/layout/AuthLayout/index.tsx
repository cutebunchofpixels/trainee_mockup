import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

export default function AuthLayout() {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
