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
  submitButtonCaption: TranslationKey
}

export default function SignupForm({
  handleSubmit,
  submitButtonCaption,
}: SignupFormProps) {
  const { t } = useTranslation()

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      className={styles.signupForm}
    >
      <Form.Item<SignupFormValues>
        label={t('email', { ns: 'common' })}
        name="email"
        rules={[
          { required: true, message: 'Email is a required filed' },
          { type: 'email', message: 'Your input should be a valid email' },
        ]}
      >
        <Input placeholder={t('email', { ns: 'common' })} />
      </Form.Item>
      <Form.Item<SignupFormValues>
        label={t('password', { ns: 'common' })}
        name="password"
        rules={[{ required: true, message: 'Password is a required field' }]}
      >
        <Input.Password placeholder={t('password', { ns: 'common' })} />
      </Form.Item>
      <Form.Item className="submit-button-wrapper">
        <Button htmlType="submit">{submitButtonCaption}</Button>
      </Form.Item>
      <Divider>{t('or', { ns: 'common' })}</Divider>
      <GoogleSigninButton />
    </Form>
  )
}
