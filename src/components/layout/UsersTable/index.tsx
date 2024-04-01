import React from 'react'
import { Table, TableProps, Typography } from 'antd'
import classNames from 'classnames'
import { TableOutlined } from '@ant-design/icons'

import { GorestUser } from 'src/types/models/User'
import { useAppDispatch, useAppSelector } from 'src/redux/app/hooks'
import { Theme } from 'src/types/Theme'
import { fetchUsers } from 'src/redux/thunks/users'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'

import styles from './styles.module.scss'

const columns: TableProps<GorestUser>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
]

export default function UsersTable() {
  const currentTheme = useAppSelector(state => state.theme.value)
  const totalPages = useAppSelector(state => state.users.totalPages)
  const pageSize = useAppSelector(state => state.users.filters.per_page)
  const page = useAppSelector(state => state.users.filters.page)
  const users = useAppSelector(state => state.users.data)
  const isLoading = useAppSelector(state => state.users.loading)
  const dispatch = useAppDispatch()

  function handlePageChange(page: number, pageSize: number) {
    dispatch(fetchUsers({ page, per_page: pageSize }))
  }

  const classes = classNames(styles.usersTable, {
    [styles.usersTableLight]: currentTheme === Theme.Light,
    [styles.usersTableDark]: currentTheme === Theme.Dark,
  })

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
    <Table
      className={classes}
      pagination={{
        pageSize: pageSize,
        onChange: handlePageChange,
        total: totalPages,
        current: page,
        showSizeChanger: false,
      }}
      columns={columns}
      dataSource={users}
      rowKey={record => record.id}
    />
  )
}
