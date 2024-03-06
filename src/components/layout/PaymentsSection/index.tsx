import React from 'react'
import { Typography, Col, Row, Button, Card } from 'antd'
import { RightOutlined, ShoppingOutlined } from '@ant-design/icons'
import DateSelector from 'components/ui/DateSelector'
import PaymentStatCard from 'components/ui/PaymentStatCard'
import classNames from './styles.module.scss'

export default function PaymentsSection() {
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
        <PaymentStatCard
          value={75000}
          valuePrefix="$"
          caption="Total revenue"
          icon={<ShoppingOutlined />}
        />
        <PaymentStatCard
          value={16}
          valuePrefix="$"
          caption="Average payment"
          icon={<ShoppingOutlined />}
        />
        <PaymentStatCard
          value={15}
          valueSuffix="%"
          caption="Repeat purchase rate"
          icon={<ShoppingOutlined />}
        />
      </div>
    </div>
  )
}
