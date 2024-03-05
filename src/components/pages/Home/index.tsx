import React from 'react'
import { Typography, Col, Row, Button, Card } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import DateSelector from '../../ui/DateSelector'
import './styles.scss'

export default function Home() {
  return (
    <div className="app-container">
      <div className="section-payments">
        <Typography.Title style={{ fontSize: '25px' }}>
          Payment Statistics
        </Typography.Title>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={10}>
              <DateSelector caption="Start date" />
            </Col>
            <Col xs={24} md={10}>
              <DateSelector caption="End date" />
            </Col>
            <Col xs={24} md={4}>
              <Button type="primary" className="text-uppercase w-100 font-sm">
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
