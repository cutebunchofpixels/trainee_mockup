import React, { useMemo } from 'react'
import { Table, Typography } from 'antd'
import classNames from 'classnames'
import { TableOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { Theme } from 'src/types/Theme'
import ContainerSkeleton from 'src/components/ui/ContainerSkeleton'
import { themeStore } from 'src/mobx/theme'
import { userStore } from 'src/mobx/users'

import styles from './styles.module.scss'

function UsersTable() {
  const currentTheme = themeStore.theme
  const { users, isLoading, page, pageSize, totalPages } = userStore
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  function handlePageChange(page: number, pageSize: number) {
    userStore.setPagination(page, pageSize)
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
        pageSize,
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

export default observer(UsersTable)
