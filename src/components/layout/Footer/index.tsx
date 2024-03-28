import React from 'react'
import { Layout, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

export default function Footer() {
  return (
    <Layout.Footer className={styles.footer}>
      <Typography.Text className={styles.appTitle}>
        Trainee mockup
      </Typography.Text>
      <Space>
        <Link to="/signin">Signin</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/currency">Currency</Link>
        <Link to="/users">Users</Link>
      </Space>
    </Layout.Footer>
  )
}
