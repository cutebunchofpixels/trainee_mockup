import React, { ReactNode } from 'react'
import { Card, Statistic } from 'antd'
import styles from './styles.module.scss'
import resources from 'types/resources'
import { useTranslation } from 'react-i18next'

type PaymentStatsCardType = 'currency' | 'percentage'

export interface PaymentStatsCardInfo {
  type: PaymentStatsCardType
  captionKey: keyof (typeof resources)['translation']
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
  const { t } = useTranslation()

  return (
    <Card className={styles.statCard}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.textBlock}>
        <Statistic
          title={t(cardInfo.captionKey)}
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
