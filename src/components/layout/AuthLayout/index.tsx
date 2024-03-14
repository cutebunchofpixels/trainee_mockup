import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import classNames from './styles.module.scss'

export default function AuthLayout() {
  return (
    <Layout>
      <Header />
      <Layout.Content className={classNames['auth-layout']}>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}
