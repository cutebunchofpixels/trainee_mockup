import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <Layout>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
