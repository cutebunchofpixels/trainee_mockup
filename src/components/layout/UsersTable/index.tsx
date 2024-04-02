import React, { useMemo } from 'react'
import { Table, Typography } from 'antd'
import classNames from 'classnames'
import { TableOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { Theme } from 'src/types/Theme'
import { fetchUsers } from 'src/redux/thunks/users'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'

import styles from './styles.module.scss'

export default function UsersTable() {
  const currentTheme = useAppSelector(state => state.theme.value)
  const totalPages = useAppSelector(state => state.users.totalPages)
  const pageSize = useAppSelector(state => state.users.filters.per_page)
  const page = useAppSelector(state => state.users.filters.page)
  const users = useAppSelector(state => state.users.data)
  const isLoading = useAppSelector(state => state.users.loading)
  const dispatch = useAppDispatch()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  function handlePageChange(page: number, pageSize: number) {
    dispatch(fetchUsers({ page, per_page: pageSize }))
  }

  const classes = classNames(styles.usersTable, {
    [styles.usersTableLight]: currentTheme === Theme.Light,
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
