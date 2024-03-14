import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import classNames from './styles.module.scss'

export default function AuthLayout() {
  return (
    <Layout className={classNames['auth-layout']}>
      <Header />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
