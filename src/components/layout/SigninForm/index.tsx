import React from 'react'
import { Button, Form, FormProps, Input } from 'antd'
import './styles.modules.scss'

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
  return (
    <Form
      onFinish={handleSubmit}
      onFinishFailed={handleError}
      layout="vertical"
    >
      <Form.Item<SigninFormValues>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Username is a required field' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item<SigninFormValues>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Password is a required field' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item className="submit-button-wrapper">
        <Button htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  )
}
