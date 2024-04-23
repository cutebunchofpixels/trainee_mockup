import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Form, Input, Select, Spin, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useForm } from 'antd/es/form/Form'
import { isEqual, omit } from 'lodash'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { getEnumOptions } from 'src/utils/getEnumOptions'
import { UserService } from 'src/api/users/UsersService'
import { userStore } from 'src/mobx/users'

import styles from './styles.module.scss'

export type EditUserFormValues = Omit<GorestUser, 'id'>

interface EditUserFormProps {
  userId: number
  submitCallback?: () => void
}

export default function EditUserForm({
  userId,
  submitCallback,
}: EditUserFormProps) {
  const { t, i18n } = useTranslation()
  const [form] = useForm()
  const initialUser = useRef<EditUserFormValues>({} as EditUserFormValues)
  const [formValues, setValues] = useState<EditUserFormValues | null>(null)

  useEffect(() => {
    if (!formValues) {
      UserService.getById(userId)
        .then((user: GorestUser) => {
          const omitted = omit(user, 'id')
          form.setFieldsValue(omitted)
          setValues(omitted)
          initialUser.current = omitted
        })
        .catch(() => {
          message.error(t('errors.unexpected'))
        })
    }
  }, [])

  const genderOptions = useMemo(
    () => getEnumOptions<Gender>(Gender, gender => t(`gender.${gender}`)),
    [i18n.resolvedLanguage]
  )

  const statusOptions = useMemo(
    () => getEnumOptions<Status>(Status, status => t(`status.${status}`)),
    [i18n.resolvedLanguage]
  )

  async function handleSubmit(values: EditUserFormValues) {
    try {
      await UserService.update(userId, values)
      userStore.invalidate()
      message.success(t('editUser.success'))
      submitCallback && submitCallback()
    } catch (error) {
      message.error(t('errors.unexpected'))
    }
  }

  return (
    <Spin spinning={!formValues}>
      <Form<EditUserFormValues>
        layout="vertical"
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
  )
}
