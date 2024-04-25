import React, { useMemo, useState } from 'react'
import { Button, Table, TableProps } from 'antd'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { EditOutlined } from '@ant-design/icons'

import { Gender, GorestUser, Status } from 'src/types/models/User'
import { Theme } from 'src/types/Theme'
import { themeStore } from 'src/mobx/theme'
import { userStore } from 'src/mobx/users'
import EditUserModal from '../EditUserModal'

import styles from './styles.module.scss'

function UsersTable() {
  const currentTheme = themeStore.theme
  const { users, isLoading, page, pageSize, totalPages } = userStore
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  function handlePageChange(page: number, pageSize: number) {
    userStore.setPagination(page, pageSize)
  }

  function handleEditClick(e: React.MouseEvent<HTMLElement>, user: GorestUser) {
    e.stopPropagation()
    setSelectedUserId(user.id)
    setModalOpen(true)
  }

  const classes = classNames(styles.usersTable, {
    [styles.usersTableLight]: currentTheme === Theme.Light,
    [styles.usersTableDark]: currentTheme === Theme.Dark,
  })

  const columns: TableProps<GorestUser>['columns'] = useMemo(
    () => [
      {
        title: t('id', { ns: 'common' }),
        dataIndex: 'id',
        key: 'id',
        width: 150,
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
        width: 150,
      },
      {
        title: t('status', { ns: 'common' }),
        dataIndex: 'status',
        key: 'status',
        render: (value: Status) => t(`status.${value}`),
        width: 150,
      },
      {
        title: '',
        dataIndex: 'actions',
        width: 75,
        render: (_, record) => (
          <Button
            type="default"
            icon={<EditOutlined />}
            shape="default"
            onClick={e => handleEditClick(e, record)}
          />
        ),
      },
    ],
    [i18n.resolvedLanguage]
  )

  return (
    <>
      {selectedUserId && (
        <EditUserModal
          focusTriggerAfterClose
          userId={selectedUserId}
          open={isModalOpen}
          submitCallback={() => {
            setModalOpen(false)
            setSelectedUserId(null)
          }}
          onCancel={() => {
            setModalOpen(false)
          }}
        />
      )}
      <Table<GorestUser>
        size="middle"
        className={classes}
        loading={isLoading}
        pagination={{
          pageSize,
          onChange: handlePageChange,
          total: totalPages,
          current: page,
          showSizeChanger: false,
          'aria-label': 'Table pagination',
        }}
        onRow={user => ({
          onClick: e => {
            if (e.ctrlKey || e.metaKey) {
              setSelectedUserId(user.id)
              setModalOpen(true)
            } else {
              navigate(`${user.id}`)
            }
          },
        })}
        columns={columns}
        dataSource={users}
        rowKey={record => record.id}
      />
    </>
  )
}

export default observer(UsersTable)
