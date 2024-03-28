import React from 'react'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import ExchangeIntervalSelectorsBlock from '../ExchangeIntervalSelectorsBlock'
import PaymentStatCardList from '../PaymentStatCardList'
import RevenueChartBlock from '../RevenueChartBlock'

import styles from './styles.module.scss'

export default function PaymentsSection() {
  const { t } = useTranslation()

  return (
    <section className={styles.paymentsSection}>
      <Typography.Title>{t('sectionPayments.heading')}</Typography.Title>
      <ExchangeIntervalSelectorsBlock />
      <PaymentStatCardList />
      <RevenueChartBlock />
    </section>
  )
}
