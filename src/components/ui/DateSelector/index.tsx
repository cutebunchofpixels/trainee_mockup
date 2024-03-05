import React from 'react'
import { DatePicker, Space, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import classNames from './styles.module.scss'

export default function DateSelector({ caption }: { caption: string }) {
  return (
    <div className={classNames['date-selector']}>
      <Typography.Text className={classNames['date-selector__caption']}>
        {caption}
      </Typography.Text>
      <Space.Compact>
        <div className={classNames['date-selector__icon-block']}>
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
