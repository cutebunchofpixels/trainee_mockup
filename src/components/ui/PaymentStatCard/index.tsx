import React, { ReactNode } from 'react'
import { Card, Statistic } from 'antd'
import classNames from './styles.module.scss'

type PaymentStatsCardType = 'currency' | 'percentage'

export interface PaymentStatsCardInfo {
  type: PaymentStatsCardType
  caption: string
  value: number
}

const valueAddons: Record<
  PaymentStatsCardType,
  { prefix?: string; suffix?: string }
> = {
  currency: {
    prefix: '$',
  },
  percentage: {
    suffix: '%',
  },
}

interface PaymetStatCardProps {
  icon: ReactNode
  cardInfo: PaymentStatsCardInfo
}

export default function PaymentStatCard({
  icon,
  cardInfo,
}: PaymetStatCardProps) {
  return (
    <Card className={classNames['stat-card']}>
      <div className={classNames['icon']}>{icon}</div>
      <div className={classNames['text-block']}>
        <Statistic
          title={cardInfo.caption}
          value={cardInfo.value}
          formatter={value =>
            value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })
          }
          prefix={valueAddons[cardInfo.type].prefix}
          suffix={valueAddons[cardInfo.type].suffix}
        />
      </div>
    </Card>
  )
}
