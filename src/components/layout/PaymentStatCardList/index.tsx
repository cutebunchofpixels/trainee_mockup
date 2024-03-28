import React from 'react'
import { ShoppingOutlined } from '@ant-design/icons'

import PaymentStatCard from 'src/components/ui/PaymentStatCard'
import { useAppSelector } from 'src/redux/app/hooks'

import styles from './styles.module.scss'

export default function PaymentStatCardList() {
  const cardsInfo = useAppSelector(state => state.paymentStats.value)

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
