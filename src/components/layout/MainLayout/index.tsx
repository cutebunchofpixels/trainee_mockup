import { Layout } from 'antd'
import React from 'react'
import ThemeSwitch from '../ThemeSwitch'
import LocaleSelect from '../LocaleSelect'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import './styles.module.scss'

export default function MainLayout() {
  return (
    <Layout>
      <Layout.Header>
        <ThemeSwitch />
        <LocaleSelect />
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
