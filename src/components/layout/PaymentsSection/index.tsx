import React from 'react'
import { Typography, Col, Row, Button, Card } from 'antd'
import { RightOutlined, ShoppingOutlined } from '@ant-design/icons'
import DateSelector from 'components/ui/DateSelector'
import PaymentStatCard from 'components/ui/PaymentStatCard'
import classNames from './styles.module.scss'
import { useAppSelector } from 'redux/app/hooks'

export default function PaymentsSection() {
  const cardsInfo = useAppSelector(state => state.paymentStats.value)

  return (
    <div className={classNames['payments-section']}>
      <Typography.Title>Payment Statistics</Typography.Title>
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <DateSelector caption="Start date" />
          </Col>
          <Col xs={24} md={10}>
            <DateSelector caption="End date" />
          </Col>
          <Col xs={24} md={4}>
            <Button
              type="primary"
              className={`${classNames['text-uppercase']} ${classNames['w-100']} ${classNames['font-sm']}`}
            >
              View report
              <RightOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
      <div className={classNames['stat-cards']}>
        {cardsInfo.map(item => (
          <PaymentStatCard
            icon={<ShoppingOutlined />}
            cardInfo={item}
            key={item.caption}
          />
        ))}
      </div>
    </div>
  )
}