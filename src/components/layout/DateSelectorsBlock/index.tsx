import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'

import DateSelector from 'src/components/ui/DateSelector'

import styles from './styles.module.scss'
import { minDate, dateDifference } from 'src/utils/validators'

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
          rules={[
            {
              required: true,
              message: t('errors.dateSelectors.startDateRequired'),
            },
          ]}
        >
          <DateSelector />
        </Form.Item>
        <Form.Item<FormValues>
          name="endDate"
          label={t('reportDateSelectForm.endDate')}
          rules={[
            {
              required: true,
              message: t('errors.dateSelectors.endDateRequired'),
            },
            {
              validator: (_, endDate: Dayjs) =>
                minDate(form.getFieldValue('startDate'), endDate),
              message: t('errors.dateSelectors.endDateBeforeStartDate'),
            },
            {
              validator: (_, endDate: Dayjs) =>
                dateDifference(endDate, form.getFieldValue('startDate'), {
                  maxDifference: { value: 5, unit: 'day' },
                }),
              message: t('errors.dateSelectors.selectedPeriodIsTooLong'),
            },
            {
              validator: (_, endDate: Dayjs) => minDate(endDate, dayjs()),
              message: t('errors.dateSelectors.futureEndDate'),
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
