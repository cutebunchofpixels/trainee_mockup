import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, Form, Input, Select, Spin, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useForm } from 'antd/es/form/Form'
import { isEqual, omit } from 'lodash'
import { useNavigate, useParams } from 'react-router-dom'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { getEnumOptions } from 'src/utils/getEnumOptions'
import { UserService } from 'src/api/users/UsersService'
import { RoutePararms } from 'src/components/pages/EditUser'
import { userStore } from 'src/mobx/users'

import styles from './styles.module.scss'

export type EditUserFormValues = Omit<GorestUser, 'id'>

interface EditUserFormProps {
  user?: GorestUser
}

export default function EditUserForm({ user }: EditUserFormProps) {
  const { t, i18n } = useTranslation()
  const [form] = useForm()
  const initialUser = useRef<EditUserFormValues>()
  const { userId } = useParams<RoutePararms>()
  const navigate = useNavigate()
  const [formValues, setValues] = useState<EditUserFormValues>(
    {} as EditUserFormValues
  )

  const genderOptions = useMemo(
    () => getEnumOptions<Gender>(Gender, gender => t(`gender.${gender}`)),
    [i18n.resolvedLanguage]
  )

  const statusOptions = useMemo(
    () => getEnumOptions<Status>(Status, status => t(`status.${status}`)),
    [i18n.resolvedLanguage]
  )

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user)
      const formUser = omit(user, 'id')
      initialUser.current = formUser
      setValues(formUser)
    }
  }, [user])

  function handleSubmit(values: EditUserFormValues) {
    UserService.update(userId!, values)
      .then(() => {
        userStore.invalidate()
        navigate('/users')
        message.success(t('editUser.success'))
      })
      .catch(() => message.error(t('errors.unexpected')))
  }

  return (
    <Card className={styles.editUserFormContainer}>
      <Spin spinning={!user}>
        <Form<EditUserFormValues>
          layout="vertical"
          initialValues={user}
          onFinish={handleSubmit}
          form={form}
          onFieldsChange={(_, fields) => {
            const formUser = {} as any

            for (const field of fields) {
              const fieldName = (field.name as string[])[0]
              formUser[fieldName] = field.value
            }

            setValues(formUser)
          }}
        >
          <Form.Item name="name" label={t('name', { ns: 'common' })}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label={t('email', { ns: 'common' })}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label={t('gender', { ns: 'common' })}>
            <Select options={genderOptions} />
          </Form.Item>
          <Form.Item name="status" label={t('status', { ns: 'common' })}>
            <Select options={statusOptions} />
          </Form.Item>
          <Form.Item noStyle wrapperCol={{ span: 24 }}>
            <Button
              htmlType="submit"
              className={styles.submitButton}
              disabled={isEqual(formValues, initialUser.current)}
            >
              {t('submit', { ns: 'common' })}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  )
}
