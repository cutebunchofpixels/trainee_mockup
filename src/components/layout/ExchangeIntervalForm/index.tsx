import React, { useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'

import { dayjs } from 'src/utils/dayjs'
import DateSelector from 'src/components/ui/DateSelector'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'
import { Currency } from 'src/types/Currency'
import { shouldRefetchExchangeRates } from 'src/utils/shouldRefetchExchangeRates'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

export const MIN_CURRENCY_EXCHANGE_INTERVAL_SIZE = 3
const MAX_CURRENCY_EXCHANGE_INTERVAL_SIZE = 5

const startOfPreviousWeek = dayjs().subtract(1, 'week').startOf('week')
export const initialExchangeChartPeriod: FormValues = {
  startDate: startOfPreviousWeek,
  endDate: startOfPreviousWeek.add(4, 'day'),
}

export default function ExchangeIntervalForm() {
  const [form] = Form.useForm<FormValues>()
  const { t, i18n } = useTranslation()

  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })

  const dispatch = useAppDispatch()
  const exchangeRates = useAppSelector(state => state.currencyExchange.data)
  const loadedStartDate = useAppSelector(
    state => state.currencyExchange.startDate
  )
  const loadedEndDate = useAppSelector(state => state.currencyExchange.endDate)

  const currentStartDate = Form.useWatch('startDate', form)
  const currentEndDate = Form.useWatch('endDate', form)

  useEffect(() => {
    if (loadedStartDate && loadedEndDate) {
      form.setFieldValue('startDate', dayjs(loadedStartDate))
      form.setFieldValue('endDate', dayjs(loadedEndDate))
    }
  }, [exchangeRates])

  return (
    <Form<FormValues>
      initialValues={initialExchangeChartPeriod}
      layout={isScreenMd ? 'vertical' : 'inline'}
      className={styles.dateSelectorsForm}
      onFinish={({ startDate, endDate }) => {
        if (shouldRefetchExchangeRates(startDate, endDate)) {
          dispatch(fetchExchangeRates(Currency.UAH, startDate, endDate))
        }
      }}
      form={form}
    >
      <Form.Item<FormValues>
        name="startDate"
        label={t('reportDateSelectForm.startDate')}
        help={''}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DateSelector
          disabledDate={date => {
            if (!currentEndDate && date.isBefore(dayjs())) {
              return false
            }

            if (
              currentEndDate &&
              currentEndDate.diff(date, 'day') >=
                MIN_CURRENCY_EXCHANGE_INTERVAL_SIZE &&
              currentEndDate.diff(date, 'day') <=
                MAX_CURRENCY_EXCHANGE_INTERVAL_SIZE
            ) {
              return false
            }

            return true
          }}
        />
      </Form.Item>
      <Form.Item<FormValues>
        label={t('reportDateSelectForm.endDate')}
        name="endDate"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DateSelector
          disabledDate={date => {
            if (!currentStartDate && date.isBefore(dayjs())) {
              return false
            }

            if (
              currentStartDate &&
              date.diff(currentStartDate, 'day') >=
                MIN_CURRENCY_EXCHANGE_INTERVAL_SIZE &&
              date.diff(currentStartDate, 'day') <=
                MAX_CURRENCY_EXCHANGE_INTERVAL_SIZE
            ) {
              return false
            }

            return true
          }}
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!currentStartDate || !currentEndDate}
        >
          {t('reportDateSelectForm.viewReport')}
          {i18n.dir() === 'ltr' ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </Form.Item>
    </Form>
  )
}
