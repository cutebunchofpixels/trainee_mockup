import React, { useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs, { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'

import DateSelector from 'src/components/ui/DateSelector'
import { minDate, dateDifference } from 'src/utils/validators'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { fetchExchangeRates } from 'src/redux/thunks/currencyExchange'
import { Currency } from 'src/types/Currency'
import { CurrencyExchangeRates } from 'src/types/models/CurrencyExchangeRates'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

const startOfPreviousWeek = dayjs().subtract(1, 'week').startOf('week')
export const initialCurrencyExchangePeriod: FormValues = {
  startDate: startOfPreviousWeek,
  endDate: startOfPreviousWeek.add(5, 'day'),
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

export default function ExchangeIntervalForm() {
  const [form] = Form.useForm<FormValues>()
  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()
  const currencyExchangeRates = useAppSelector(
    state => state.currencyExchange.data
  )

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
  )
}
