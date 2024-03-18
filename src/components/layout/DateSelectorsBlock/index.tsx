import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'

import DateSelector from 'components/ui/DateSelector'

export default function DateSelectorsBlock() {
  const { t, i18n } = useTranslation()

  return (
    <Card>
      <form>
        <Row gutter={[32, 16]}>
          <Col xs={24} md={9}>
            <DateSelector caption={t('reportDateSelectForm.startDate')} />
          </Col>
          <Col xs={24} md={9}>
            <DateSelector caption={t('reportDateSelectForm.endDate')} />
          </Col>
          <Col xs={24} md={{ span: 5, offset: 1 }}>
            <Button type="primary" htmlType="submit">
              {t('reportDateSelectForm.viewReport')}
              {i18n.dir() === 'ltr' ? <RightOutlined /> : <LeftOutlined />}
            </Button>
          </Col>
        </Row>
      </form>
    </Card>
  )
}
