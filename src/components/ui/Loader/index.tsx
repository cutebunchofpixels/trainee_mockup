import React from 'react'
import { Spin, SpinProps } from 'antd'

import styles from './styles.module.scss'

export default function Loader({ ...rest }: Omit<SpinProps, 'spinning'>) {
  return (
    <div className={styles.loaderContainer}>
      <Spin spinning {...rest} />
    </div>
  )
}
