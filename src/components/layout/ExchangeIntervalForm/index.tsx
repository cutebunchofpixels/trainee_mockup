import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Dayjs } from 'dayjs'
import { dayjs } from 'src/utils/dayjs'
import { useMediaQuery } from 'react-responsive'

import DateSelector from 'src/components/ui/DateSelector'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'
import { Currency } from 'src/types/Currency'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

const startOfPreviousWeek = dayjs().subtract(1, 'week').startOf('day')
export const initialCurrencyExchangePeriod: FormValues = {
  startDate: startOfPreviousWeek,
  endDate: startOfPreviousWeek.add(4, 'day'),
}

function shouldRefetch(
  loadedExchangeRates: CurrencyExchangeRates[],
  startDate: Dayjs,
  endDate: Dayjs
) {
  if (loadedExchangeRates.length < 1) {
    return true
  }

  if (endDate.isSame(dayjs(), 'day')) {
    return true
  }

  if (
    !dayjs(loadedExchangeRates[0].date).isSame(startDate, 'day') ||
    !dayjs(loadedExchangeRates.at(-1)!.date).isSame(endDate, 'day')
  ) {
    return true
  }

  return false
}

const MIN_INTERVAL_SIZE = 3
const MAX_INTERVAL_SIZE = 5

export default function ExchangeIntervalForm() {
  const [form] = Form.useForm<FormValues>()
  const { t, i18n } = useTranslation()

  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })

  const dispatch = useAppDispatch()
  const currencyExchangeRates = useAppSelector(
    state => state.currencyExchange.data
  )

  const startDate = Form.useWatch('startDate', form)
  const endDate = Form.useWatch('endDate', form)

  return (
    <Form<FormValues>
      initialValues={initialCurrencyExchangePeriod}
      layout={isScreenMd ? 'vertical' : 'inline'}
      className={styles.dateSelectorsForm}
      onFinish={({ startDate, endDate }) => {
        if (shouldRefetch(currencyExchangeRates, startDate, endDate)) {
          dispatch(fetchExchangeRates(Currency.EUR, startDate, endDate))
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
            if (!endDate && date.isBefore(dayjs())) {
              return false
            }

            if (
              endDate &&
              endDate.diff(date, 'day') >= MIN_INTERVAL_SIZE &&
              endDate.diff(date, 'day') <= MAX_INTERVAL_SIZE
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
            if (!startDate && date.isBefore(dayjs())) {
              return false
            }

            if (
              startDate &&
              date.diff(startDate, 'day') >= MIN_INTERVAL_SIZE &&
              date.diff(startDate, 'day') <= MAX_INTERVAL_SIZE
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
          disabled={!startDate || !endDate}
        >
          {t('reportDateSelectForm.viewReport')}
          {i18n.dir() === 'ltr' ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </Form.Item>
    </Form>
  )
}
