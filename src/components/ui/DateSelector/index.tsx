import React from 'react'
import { DatePicker, Space, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'

export default function DateSelector({ caption }: { caption: string }) {
  return (
    <div className={styles.dateSelector}>
      <Typography.Text className={styles.caption}>{caption}</Typography.Text>
      <Space.Compact>
        <div className={styles.iconBlock}>
          <CalendarOutlined />
        </div>
        <DatePicker
          suffixIcon={null}
          format={value => value.format('MMM DD, YYYY')}
        />
      </Space.Compact>
    </div>
  )
}
