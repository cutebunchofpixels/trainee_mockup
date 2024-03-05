import React from 'react'
import { Typography, Col, Row, Button, Card } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import DateSelector from '../../ui/DateSelector'
import classNames from './styles.module.scss'

export default function Home() {
  return (
    <div className={classNames['app-container']}>
      <div className={classNames['section-payments']}>
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
      </div>
    </div>
  )
}
