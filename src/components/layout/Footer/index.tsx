import React from 'react'
import { Layout } from 'antd'
import Link from 'src/components/ui/Link'

import styles from './styles.module.scss'

export default function Footer() {
  return (
    <Layout.Footer className={styles.footer}>
      <nav className={styles.navigation}>
        <ul className={styles.navigationList}>
          <li>
            <Link to="/signin">Signin</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/currency">Currency</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
    </Layout.Footer>
  )
}
