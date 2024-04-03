import React, { useMemo } from 'react'
import { Table, Typography } from 'antd'
import classNames from 'classnames'
import { TableOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { Theme } from 'src/types/Theme'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'

import styles from './styles.module.scss'
import { mockUsers } from './mockUsers'

export default function UsersTable() {
  const currentTheme = Theme.Light
  const totalPages = 100
  const pageSize = 8
  const page = 1
  const users = mockUsers
  const isLoading = false
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  function handlePageChange(page: number, pageSize: number) {
    console.log('users table page change')
  }

  const classes = classNames(styles.usersTable, {
    [styles.usersTableLight]: currentTheme === Theme.Light,
    //eslint-disable-next-line
    //@ts-ignore
    [styles.usersTableDark]: currentTheme === Theme.Dark,
  })

  const columns = useMemo(
    () => [
      {
        title: t('id', { ns: 'common' }),
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: t('name', { ns: 'common' }),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: t('gender', { ns: 'common' }),
        dataIndex: 'gender',
        key: 'gender',
        render: (value: Gender) => t(`gender.${value}`),
      },
      {
        title: t('status', { ns: 'common' }),
        dataIndex: 'status',
        key: 'status',
        render: (value: Status) => t(`status.${value}`),
      },
    ],
    [i18n.resolvedLanguage]
  )

  if (isLoading) {
    return (
      <div className={styles.tableLoadingSkeleton}>
        <ContainerSkeleton active>
          <Typography.Text>
            <TableOutlined className={styles.tableLoadingIcon} />
          </Typography.Text>
        </ContainerSkeleton>
      </div>
    )
  }

  return (
    <Table<GorestUser>
      className={classes}
      pagination={{
        pageSize: pageSize,
        onChange: handlePageChange,
        total: totalPages,
        current: page,
        showSizeChanger: false,
      }}
      onRow={user => ({
        onClick: () => navigate(`${user.id}`),
      })}
      columns={columns}
      dataSource={users}
      rowKey={record => record.id}
    />
  )
}
