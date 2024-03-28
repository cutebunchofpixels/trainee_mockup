import React from 'react'
import { Table, TableProps } from 'antd'
import classNames from 'classnames'

import { mockUsers } from './mockUsers'
import { GorestUser } from 'src/types/models/User'
import { useAppSelector } from 'src/redux/app/hooks'
import { Theme } from 'src/types/Theme'

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
  function handlePageChange(page: number, pageSize: number) {
    console.log(page, pageSize)
  }

  const classes = classNames(styles.usersTable, {
    [styles.usersTableLight]: currentTheme === Theme.Light,
    [styles.usersTableDark]: currentTheme === Theme.Dark,
  })

  return (
    <Table
      className={classes}
      pagination={{ pageSize: 8, onChange: handlePageChange }}
      columns={columns}
      dataSource={mockUsers}
      rowKey={record => record.id}
    />
  )
}
