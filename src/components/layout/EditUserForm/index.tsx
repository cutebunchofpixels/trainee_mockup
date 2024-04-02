import React, { useMemo } from 'react'
import { Button, Card, Form, Input, Select } from 'antd'
import { useTranslation } from 'react-i18next'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { getEnumOptions } from 'src/utils/getEnumOptions'

import styles from './styles.module.scss'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'
import { FormOutlined } from '@ant-design/icons'

export type EditUserFormValues = Omit<GorestUser, 'id'>

interface EditUserFormProps {
  user?: GorestUser
  handleSubmit: (values: EditUserFormValues) => void
}

export default function EditUserForm({
  user,
  handleSubmit,
}: EditUserFormProps) {
  const { t, i18n } = useTranslation()

  const genderOptions = useMemo(
    () => getEnumOptions<Gender>(Gender, gender => t(`gender.${gender}`)),
    [i18n.resolvedLanguage]
  )

  const statusOptions = useMemo(
    () => getEnumOptions<Status>(Status, status => t(`status.${status}`)),
    [i18n.resolvedLanguage]
  )

  if (!user) {
    return (
      <div className={styles.formLoadingContainer}>
        <ContainerSkeleton active>
          <FormOutlined className={styles.formLoadingIcon} />
        </ContainerSkeleton>
      </div>
    )
  }

  return (
    <Card className={styles.editUserFormContainer}>
      <Form<EditUserFormValues>
        layout="vertical"
        initialValues={user}
        onFinish={handleSubmit}
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
          <Button htmlType="submit" className={styles.submitButton}>
            {t('submit', { ns: 'common' })}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}