import React, { useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Card, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'

import DateSelector from 'src/components/ui/DateSelector'
import { minDate, dateDifference } from 'src/utils/validators'
import { useAppDispatch } from 'src/redux/app/hooks'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'
import { Currency } from 'src/types/Currency'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

const initialValues: FormValues = {
  startDate: dayjs().subtract(5, 'day'),
  endDate: dayjs(),
}

export default function DateSelectorsBlock() {
  const { t, i18n } = useTranslation()
  const [form] = Form.useForm<FormValues>()
  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchExchangeRates(
        Currency.EUR,
        initialValues.startDate,
        initialValues.endDate
      )
    )
  }, [])

  return (
    <Card>
      <Form<FormValues>
        initialValues={initialValues}
        layout={isScreenMd ? 'vertical' : 'inline'}
        className={styles.dateSelectorsForm}
        onFinish={({ startDate, endDate }) => {
          dispatch(fetchExchangeRates(Currency.EUR, startDate, endDate))
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
              validator: (_, endDate: Dayjs) =>
                dateDifference(endDate, form.getFieldValue('startDate'), {
                  minDifference: { value: 3, unit: 'day' },
                }),
              message: t('errors.dateSelectors.selectedPeriodIsTooShort'),
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
