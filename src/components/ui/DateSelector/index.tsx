import React from 'react'
import { DatePicker, Space, Typography } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import './styles.scss'

export default function DateSelector({ caption }: { caption: string }) {
  return (
    <div className="date-selector">
      <Typography.Text className="date-selector__caption">
        {caption}
      </Typography.Text>
      <Space.Compact style={{ width: '100%' }}>
        <div className="date-selector__icon-block">
          <CalendarOutlined />
        </div>
        <DatePicker
          className="w-100"
          suffixIcon={null}
          format={value => value.format('MMM DD, YYYY')}
        />
      </Space.Compact>
    </div>
  )
}
