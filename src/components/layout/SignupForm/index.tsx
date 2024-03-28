import React from 'react'
import { Button, Divider, Form, FormProps, Input } from 'antd'
import { useTranslation } from 'react-i18next'

import { TranslationKey } from 'src/types/TranslationKey'
import GoogleSigninButton from 'src/components/layout/GoogleSigninButton'

import styles from './styles.module.scss'

export interface SignupFormValues {
  email: string
  password: string
}

interface SignupFormProps {
  handleSubmit: FormProps<SignupFormValues>['onFinish']
  submitButtonCaptionKey: TranslationKey
}

export default function SignupForm({
  handleSubmit,
  submitButtonCaptionKey,
}: SignupFormProps) {
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
          { required: true, message: 'Email is a required filed' },
          { type: 'email', message: 'Your input should be a valid email' },
        ]}
      >
        <Input placeholder={t('auth.email')} />
      </Form.Item>
      <Form.Item<SignupFormValues>
        label={t('auth.password')}
        name="password"
        rules={[{ required: true, message: 'Password is a required field' }]}
      >
        <Input.Password placeholder={t('auth.password')} />
      </Form.Item>
      <Form.Item className="submit-button-wrapper">
        <Button htmlType="submit">{t(submitButtonCaptionKey)}</Button>
      </Form.Item>
      <Divider>{t('auth.dividerCaption')}</Divider>
      <GoogleSigninButton />
    </Form>
  )
}
