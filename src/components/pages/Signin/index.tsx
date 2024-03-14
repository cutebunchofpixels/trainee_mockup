import React from 'react'
import { Button, Card, Divider, Typography } from 'antd'
import SigninForm from 'components/layout/SigninForm'
import './styles.modules.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <Card>
      <SigninForm
        handleError={error => console.log(error)}
        handleSubmit={values => console.log(values)}
      />
      <Divider>Or</Divider>
      <Button icon={<GoogleOutlined />}>Google</Button>
      <Typography.Paragraph className="create-new-account-message">
        Don&apos;t have an account yet?{' '}
        <Link to="/auth/signup">Create a new one!</Link>
      </Typography.Paragraph>
    </Card>
  )
}
