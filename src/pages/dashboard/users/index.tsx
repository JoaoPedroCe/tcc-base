import React from 'react'

import { Space, Tag } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import type { ColumnsType } from 'antd/lib/table'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import DisplayFiltersTags from '~/components/DisplayFiltersTags'
import DefaultLayout from '~/components/Layout/Default'
import TableFiltersModel from '~/components/Models/TableFiltersModel'
import type { FilterProps } from '~/components/Models/TableFiltersModel/Filter'
import Table from '~/components/Table'
import TableActionsCell from '~/components/Table/TableActionsCell'
import useFilters from '~/hooks/useFilters'
import { User, UserFilters } from '~/hooks/useUser'
import useUsers from '~/hooks/useUsers'
import i18n from '~/i18n'
import { cpfMask } from '~/utils/masks'
import { defaultPropsTablePagination } from '~/utils/table'

const filters: Array<FilterProps<UserFilters>> = [
  {
    type: 'input',
    label: i18n.name,
    name: 'name',
    rules: [{ max: 200 }],
    tag: (value: string) => i18n.filterWith(i18n.name, value)
  },
  {
    type: 'input',
    label: i18n.login,
    name: 'username',
    rules: [{ max: 25 }],
    tag: (value: string) => i18n.filterWith(i18n.login, value)
  },
  {
    label: i18n.cpf,
    name: 'cpf',
    tag: (value: string) => i18n.filterWith(i18n.cpf, value),
    render: () => {
      return <MaskedInput mask={cpfMask} maskOptions={{ lazy: true }} />
    }
  },
  {
    type: 'input',
    label: i18n.email,
    name: 'email',
    rules: [{ type: 'email', max: 256 }],
    tag: (value: string) => i18n.filterWith(i18n.email, value)
  }
]

const Users = () => {
  const { query, values, setFilter, setFilters, setTableFilters } =
    useFilters<UserFilters>()
  const { data, isFetching, refetch } = useUsers(query)
  const { data: users, meta } = data || {}
  const columns: ColumnsType<User> = [
    {
      title: i18n.name,
      dataIndex: 'name',
      sorter: true
    },
    {
      title: i18n.login,
      dataIndex: 'username',
      sorter: true
    },
    {
      title: i18n.email,
      dataIndex: 'email',
      sorter: true
    },
    {
      title: i18n.active,
      dataIndex: 'isActive',
      sorter: true,
      render: visible => <Tag>{i18n[visible ? 'yes' : 'no']}</Tag>
    },
    {
      dataIndex: 'id',
      title: i18n.actions,
      render: (_, record) => (
        <Space>
          <TableActionsCell
            {...record}
            nameField="name"
            entity={i18n.user}
            onDestroy={refetch}
            destroyRoute='users'
          />
        </Space>
      ),
      className: 'table-actions'
    }
  ]

  return (
    <DefaultLayout title={i18n.users}>
      <LayoutContentCard
        extra={
          <TableActionsExtra entityName={i18n.user} onReloadClick={refetch} />
        }
      >
        <DisplayFiltersTags
          filters={filters}
          values={values}
          onClearFilter={name => setFilter(name, null)}
        />
        <Table
          columns={columns}
          dataSource={users}
          loading={isFetching}
          pagination={defaultPropsTablePagination(meta)}
          onChange={setTableFilters}
        />
      </LayoutContentCard>
      <TableFiltersModel
        filters={filters}
        values={values}
        onApplying={setFilters}
      />
    </DefaultLayout>
  )
}

export default Users
