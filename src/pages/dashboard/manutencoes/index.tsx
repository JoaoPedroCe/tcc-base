import { Space, Tag } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import DefaultLayout from '~/components/Layout/Default'
import Table from '~/components/Table'
import TableActionsCell from '~/components/Table/TableActionsCell'
import { Publication } from '~/hooks/usePublication'
import usePublications from '~/hooks/usePublications'
import useVehicles from '~/hooks/useVehicles'
import i18n from '~/i18n'
import { defaultPropsTablePagination } from '~/utils/table'

const Publications = () => {
  const { data, isFetching, refetch } = useVehicles()
  const { data: publications, meta } = data || {}
  const columns: ColumnsType<Publication> = [
    {
      title: 'Placa do veículo',
      dataIndex: 'plate',
      sorter: true
    },
    {
      title: i18n.customer,
      render: record => record.associate.name,
      sorter: true
    },
    {
      title: 'Modelo',
      dataIndex: 'model',
      sorter: true
    },
    {
      title: 'Marca',
      dataIndex: 'brand',
      sorter: true
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      sorter: true,
      render: is_published => <Tag className={is_published}>{is_published}</Tag>
    },
    {
      dataIndex: 'id',
      title: i18n.actions,
      render: (_, record) => (
        <Space>
          <TableActionsCell
            {...record}
            nameField="title"
            onDestroy={refetch}
            entity={i18n.publication}
            destroyRoute="publications"
          />
        </Space>
      ),
      className: 'table-actions'
    }
  ]

  return (
    <DefaultLayout title='Manutenções'>
      <LayoutContentCard
        extra={
          <TableActionsExtra entityName='Manutenções' onReloadClick={refetch} />
        }
      >
        <Table
          columns={columns}
          dataSource={publications}
          loading={isFetching}
          pagination={defaultPropsTablePagination(meta)}
        />
      </LayoutContentCard>
    </DefaultLayout>
  )
}
export default Publications
