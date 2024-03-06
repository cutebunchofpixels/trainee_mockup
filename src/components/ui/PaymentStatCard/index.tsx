import React, { ReactNode } from 'react'
import { Card, Typography } from 'antd'
import classNames from './styles.module.scss'

interface PaymetStatCardProps {
  icon: ReactNode
  value: number
  valuePrefix?: string
  valueSuffix?: string
  caption: string
}

export default function PaymentStatCard({
  icon,
  value,
  valuePrefix,
  valueSuffix,
  caption,
}: PaymetStatCardProps) {
  return (
    <Card className={classNames['stat-card']}>
      <div className={classNames['icon']}>{icon}</div>
      <div className={classNames['text-block']}>
        <Typography.Text className={classNames['card-value']}>
          {`${valuePrefix || ''}${value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
          })} ${valueSuffix || ''}`}
        </Typography.Text>
        <Typography.Text className={classNames['caption']}>
          {caption}
        </Typography.Text>
      </div>
    </Card>
  )
}
