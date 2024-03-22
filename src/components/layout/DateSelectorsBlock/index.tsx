import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'

import DateSelector from 'src/components/ui/DateSelector'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

export default function DateSelectorsBlock() {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })

  return (
    <Card>
      <Form
        layout={isScreenMd ? 'vertical' : 'inline'}
        className={styles.dateSelectorsForm}
        onFinish={() => {
          console.log('submit')
        }}
        onFinishFailed={() => {
          console.log(form.getFieldsError())
          console.log('error')
        }}
        form={form}
      >
        <Form.Item<FormValues>
          name="startDate"
          label={t('reportDateSelectForm.startDate')}
          rules={[{ required: true }]}
        >
          <DateSelector />
        </Form.Item>
        <Form.Item<FormValues>
          name="endDate"
          label={t('reportDateSelectForm.endDate')}
          rules={[
            { required: true },
            {
              validator: (_, value: Dayjs) => {
                const startDate = form.getFieldValue('startDate')

                if (!startDate) {
                  return Promise.resolve()
                }

                if (value && !value.isBefore(startDate)) {
                  return Promise.resolve()
                }

                return Promise.reject()
              },
              message: 'End date must not be earlier than start date',
            },
            {
              validator: (_, value: Dayjs) => {
                const startDate = form.getFieldValue('startDate')

                if (value && value.diff(startDate, 'day') > 5) {
                  return Promise.reject()
                }

                return Promise.resolve()
              },
              message: 'Selected period cannot be longer than 5 days',
            },
            {
              validator: (_, value: Dayjs) => {
                if (value && value.isAfter(dayjs())) {
                  return Promise.reject()
                }

                return Promise.resolve()
              },
              message: 'Selected period cannot be longer than 5 days',
            },
          ]}
        >
          <DateSelector />
        </Form.Item>
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit">
            {t('reportDateSelectForm.viewReport')}
            {i18n.dir() === 'ltr' ? <RightOutlined /> : <LeftOutlined />}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
