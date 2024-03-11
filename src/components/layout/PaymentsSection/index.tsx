import React from 'react'
import {
  Typography,
  Col,
  Row,
  Button,
  Card,
  Dropdown,
  Space,
  MenuProps,
} from 'antd'
import {
  RightOutlined,
  ShoppingOutlined,
  DownOutlined,
} from '@ant-design/icons'
import DateSelector from 'components/ui/DateSelector'
import PaymentStatCard from 'components/ui/PaymentStatCard'
import classNames from './styles.module.scss'
import RevenueChart from 'components/layout/RevenueChart'
import { useAppSelector } from 'redux/app/hooks'

const dropdownItems: MenuProps['items'] = [
  {
    label: 'Current week',
    key: '1',
  },
  {
    label: 'Previous week',
    key: '2',
  },
]

export default function PaymentsSection() {
  const cardsInfo = useAppSelector(state => state.paymentStats.value)

  return (
    <div className={classNames['payments-section']}>
      <Typography.Title>Payment Statistics</Typography.Title>
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={9}>
            <DateSelector caption="Start date" />
          </Col>
          <Col xs={24} md={9}>
            <DateSelector caption="End date" />
          </Col>
          <Col xs={24} md={{ span: 5, offset: 1 }}>
            <Button type="primary" className={classNames['report-button']}>
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
      <Card
        title="Revenue"
        className={classNames['chart-card']}
        extra={
          <Dropdown menu={{ items: dropdownItems }}>
            <Button type="primary">
              <Space>
                Interval
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        }
      >
        <div className={classNames['revenue-chart-container']}>
          <RevenueChart />
        </div>
      </Card>
    </div>
  )
}
