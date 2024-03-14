import React from 'react'
import { Button, Divider, Form, FormProps, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import classNames from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'

interface SigninFormValues {
  username: string
  password: string
}

interface SigninFormProps {
  handleSubmit: FormProps<SigninFormValues>['onFinish']
  handleError: FormProps<SigninFormValues>['onFinishFailed']
}

export default function SigninForm({
  handleSubmit,
  handleError,
}: SigninFormProps) {
  const { t } = useTranslation()

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={handleError}
      layout="vertical"
      className={classNames['signin-form']}
    >
      <Form.Item<SigninFormValues>
        label={t('auth.username')}
        name="username"
        rules={[{ required: true, message: t('auth.errors.usernameRequired') }]}
      >
        <Input placeholder={t('auth.username')} />
      </Form.Item>
      <Form.Item<SigninFormValues>
        label={t('auth.password')}
        name="password"
        rules={[{ required: true, message: t('auth.errors.passwordRequired') }]}
      >
        <Input.Password placeholder={t('auth.password')} />
      </Form.Item>
      <Form.Item className="submit-button-wrapper">
        <Button htmlType="submit">{t('auth.login')}</Button>
      </Form.Item>
      <Divider>{t('auth.dividerCaption')}</Divider>
      <Button htmlType="button" icon={<GoogleOutlined />}>
        Google
      </Button>
    </Form>
  )
}
