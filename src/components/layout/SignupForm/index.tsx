import React from 'react'
import { Button, Divider, Form, FormProps, Input } from 'antd'
import classNames from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface SignupFormValues {
  username: string
  email: string
  password: string
}

interface SignupFormProps {
  handleSubmit: FormProps<SignupFormValues>['onFinish']
  handleError: FormProps<SignupFormValues>['onFinishFailed']
}

export default function SignupForm({
  handleSubmit,
  handleError,
}: SignupFormProps) {
  const { t } = useTranslation()

  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={handleError}
      layout="vertical"
      className={classNames['signup-form']}
    >
      <Form.Item<SignupFormValues>
        label={t('auth.username')}
        name="username"
        rules={[{ required: true, message: t('auth.errors.usernameRequired') }]}
      >
        <Input placeholder={t('auth.username')} />
      </Form.Item>
      <Form.Item<SignupFormValues>
        label={t('auth.email')}
        name="email"
        rules={[
          { required: true, message: t('auth.errors.emailRequired') },
          { type: 'email', message: t('auth.errors.invalidEmail') },
        ]}
      >
        <Input placeholder={t('auth.email')} />
      </Form.Item>
      <Form.Item<SignupFormValues>
        label={t('auth.password')}
        name="password"
        rules={[{ required: true, message: t('auth.errors.passwordRequired') }]}
      >
        <Input.Password placeholder={t('auth.password')} />
      </Form.Item>
      <Form.Item className="submit-button-wrapper">
        <Button htmlType="submit">{t('auth.register')}</Button>
      </Form.Item>
      <Divider>{t('auth.dividerCaption')}</Divider>
      <Button htmlType="button" icon={<GoogleOutlined />}>
        Google
      </Button>
    </Form>
  )
}
