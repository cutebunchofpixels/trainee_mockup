import React, { useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Form, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { Dayjs } from 'dayjs'
import { useMediaQuery } from 'react-responsive'
import { observer } from 'mobx-react-lite'

import { dayjs } from 'src/utils/dayjs'
import DateSelector from 'src/components/ui/DateSelector'
import {
  MAX_EXCHANGE_INTERVAL,
  MIN_EXCHANGE_INTERVAL,
  currencyExchangeStore,
} from 'src/mobx/currency-exchange'

import styles from './styles.module.scss'

interface FormValues {
  startDate: Dayjs
  endDate: Dayjs
}

const initialValues: FormValues = {
  startDate: currencyExchangeStore.startDate,
  endDate: currencyExchangeStore.endDate,
}

function isValidStartDate(startDate: Dayjs, endDate: Dayjs | null) {
  if (startDate.isAfter(dayjs())) {
    return false
  }

  if (!endDate) {
    return true
  }

  const minValidDays = MIN_EXCHANGE_INTERVAL - 1
  const maxValidDays = MAX_EXCHANGE_INTERVAL - 1
  const diff = endDate.diff(startDate, 'day')

  return diff >= minValidDays && diff <= maxValidDays
}

function isValidEndDate(startDate: Dayjs, endDate: Dayjs) {
  if (endDate.isAfter(dayjs())) {
    return false
  }

  if (!startDate) {
    return true
  }

  const minValidDays = MIN_EXCHANGE_INTERVAL - 1
  const maxValidDays = MAX_EXCHANGE_INTERVAL - 1
  const diff = endDate.diff(startDate, 'day')

  return diff >= minValidDays && diff <= maxValidDays
}

function ExchangeIntervalForm() {
  const [form] = Form.useForm<FormValues>()
  const { t, i18n } = useTranslation()
  const { token } = theme.useToken()
  const isScreenMd = useMediaQuery({ maxWidth: token.screenMD })
  const formStartDate = Form.useWatch('startDate', form)
  const formEndDate = Form.useWatch('endDate', form)

  useEffect(() => {
    form.setFieldValue('startDate', currencyExchangeStore.startDate)
    form.setFieldValue('endDate', currencyExchangeStore.endDate)
  }, [currencyExchangeStore.startDate, currencyExchangeStore.endDate])

  return (
    <Form<FormValues>
      initialValues={initialValues}
      layout={isScreenMd ? 'vertical' : 'inline'}
      className={styles.dateSelectorsForm}
      onFinish={({ startDate, endDate }) => {
        currencyExchangeStore.setInterval(startDate, endDate)
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
          disabledDate={startDate => !isValidStartDate(startDate, formEndDate)}
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
          disabledDate={endDate => !isValidEndDate(formStartDate, endDate)}
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          type="primary"
          htmlType="submit"
          disabled={!formStartDate || !formEndDate}
        >
          {t('reportDateSelectForm.viewReport')}
          {i18n.dir() === 'ltr' ? (
            <RightOutlined aria-hidden />
          ) : (
            <LeftOutlined aria-hidden />
          )}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default observer(ExchangeIntervalForm)
