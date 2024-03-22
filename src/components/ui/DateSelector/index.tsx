import React from 'react'
import { DatePicker, DatePickerProps, Space } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'

import styles from './styles.module.scss'

export default function DateSelector({ ...rest }: DatePickerProps) {
  return (
    <Space.Compact className={styles.dateSelector}>
      <div className={styles.iconBlock}>
        <CalendarOutlined />
      </div>
      <DatePicker
        suffixIcon={null}
        format={value => value.format('MMM DD, YYYY')}
        {...rest}
      />
    </Space.Compact>
  )
}
