import React from 'react'
import { Button, Divider, Form, FormProps, Input } from 'antd'
import styles from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface SignupFormValues {
  email: string
  password: string
}

interface SignupFormProps {
  handleSubmit: FormProps<SignupFormValues>['onFinish']
}

export default function SignupForm({ handleSubmit }: SignupFormProps) {
  const { t } = useTranslation()

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      className={styles.signupForm}
    >
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
