import React from 'react'
import { ShoppingOutlined } from '@ant-design/icons'

import PaymentStatCard from 'src/components/ui/PaymentStatCard'
import { paymentStatsStore } from 'src/mobx/payment-stats'
import { observer } from 'mobx-react-lite'

import styles from './styles.module.scss'

function PaymentStatCardList() {
  const cards = paymentStatsStore.cards

  return (
    <div className={styles.statCards}>
      {cards.map(card => (
        <PaymentStatCard
          icon={<ShoppingOutlined />}
          cardInfo={card}
          key={card.captionKey}
        />
      ))}
    </div>
  )
}

export default observer(PaymentStatCardList)
