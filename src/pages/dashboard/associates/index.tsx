import React from 'react'

import { Space, Tag } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import type { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import DisplayFiltersTags from '~/components/DisplayFiltersTags'
import DatePicker from '~/components/Inputs/DatePicker'
import DefaultLayout from '~/components/Layout/Default'
import TableFiltersModel from '~/components/Models/TableFiltersModel'
import type { FilterProps } from '~/components/Models/TableFiltersModel/Filter'
import Table from '~/components/Table'
import TableActionsCell from '~/components/Table/TableActionsCell'
import { Associate, AssociateFilters } from '~/hooks/useAssociate'
import useAssociates from '~/hooks/useAssociates'
import useFilters from '~/hooks/useFilters'
import i18n from '~/i18n'
import { cellphoneMask, cpfMask, phoneMask } from '~/utils/masks'
import { defaultPropsTablePagination } from '~/utils/table'

const filters: Array<FilterProps<AssociateFilters>> = [
  {
    type: 'input',
    label: i18n.name,
    name: 'name',
    rules: [{ max: 200 }],
    tag: (value: string) => i18n.filterWith(i18n.name, value)
  },
  {
    type: 'input',
    label: i18n.birthDate,
    name: 'birthDate',
    tag: (value: string) => {
      return i18n.filterWith(i18n.birthDate, dayjs(value).format('dd/MM/yyyy'))
    },
    render: () => {
      return <DatePicker format="DD/MM/YYYY" picker="date" />
    }
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
  },
  {
    type: 'input',
    label: i18n.company,
    name: 'company',
    rules: [{ max: 25 }],
    tag: (value: string) => i18n.filterWith(i18n.company, value)
  },
  {
    label: i18n.cellphone,
    name: 'cellphone',
    tag: (value: string) => i18n.filterWith(i18n.cellphone, value),
    render: () => {
      return <MaskedInput mask={cellphoneMask} maskOptions={{ lazy: true }} />
    }
  },
  {
    label: i18n.phone,
    name: 'phone',
    tag: (value: string) => i18n.filterWith(i18n.phone, value),
    render: () => {
      return <MaskedInput mask={phoneMask} maskOptions={{ lazy: true }} />
    }
  }
]

const Associates = () => {
  const { query, values, setFilter, setFilters, setTableFilters } =
    useFilters<AssociateFilters>()
  const { data, isFetching, refetch } = useAssociates(query)
  const { data: associates, meta } = data || {}
  const columns: ColumnsType<Associate> = [
    {
      title: i18n.name,
      dataIndex: 'name',
      sorter: true
    },
    {
      title: i18n.cpf,
      dataIndex: 'cpf',
      sorter: true
    },
    {
      title: i18n.email,
      dataIndex: 'email',
      sorter: true
    },
    {
      title: i18n.cellphone,
      dataIndex: 'cellphone',
      sorter: true
    },
    {
      dataIndex: 'id',
      title: i18n.actions,
      render: (_, record) => (
        <Space>
          <TableActionsCell
            {...record}
            entity={i18n.associate}
            onDestroy={refetch}
            destroyRoute="associates"
          />
        </Space>
      ),
      className: 'table-actions'
    }
  ]

  return (
    <DefaultLayout title={i18n.customers}>
      <LayoutContentCard
        extra={
          <TableActionsExtra
            entityName={i18n.customers}
            onReloadClick={refetch}
          />
        }
      >
        <DisplayFiltersTags
          filters={filters}
          values={values}
          onClearFilter={name => setFilter(name, null)}
        />
        <Table
          columns={columns}
          dataSource={associates}
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

export default Associates
