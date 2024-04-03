import React from 'react'
import { ShoppingOutlined } from '@ant-design/icons'

import PaymentStatCard, {
  PaymentStatsCardInfo,
} from 'src/components/ui/PaymentStatCard'

import styles from './styles.module.scss'

const mockCards: PaymentStatsCardInfo[] = [
  {
    value: 75000,
    type: 'currency',
    captionKey: 'revenueStats.totalRevenue',
  },
  { value: 16, type: 'currency', captionKey: 'revenueStats.averagePayment' },
  {
    value: 15,
    type: 'percentage',
    captionKey: 'revenueStats.repeatPurchaseRate',
  },
]

export default function PaymentStatCardList() {
  const cardsInfo = mockCards

  return (
    <div className={styles.statCards}>
      {cardsInfo.map(item => (
        <PaymentStatCard
          icon={<ShoppingOutlined />}
          cardInfo={item}
          key={item.captionKey}
        />
      ))}
    </div>
  )
}
