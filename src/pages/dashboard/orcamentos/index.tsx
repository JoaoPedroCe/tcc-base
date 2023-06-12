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
import i18n from '~/i18n'
import { defaultPropsTablePagination } from '~/utils/table'

const Publications = () => {
  const { data, isFetching, refetch } = usePublications()
  const { data: publications, meta } = data || {}
  const columns: ColumnsType<Publication> = [
    {
      title: 'Placa do veículo',
      dataIndex: 'title',
      sorter: true
    },
    {
      title: i18n.customer,
      render: record => record.associate.name,
      sorter: true
    },
    {
      title: i18n.registrationDate,
      dataIndex: 'createdAt',
      sorter: true,
      render: crated_at => dayjs(crated_at)?.format('DD/MM/YYYY - hh:mm:ss')
    },
    {
      title: i18n.aprovedDate,
      dataIndex: 'publishedAt',
      sorter: true,
      render: published_at => {
        if (!published_at) return
        return dayjs(published_at)?.format('DD/MM/YYYY - hh:mm:ss')
      }
    },
    {
      title: 'Aprovação',
      dataIndex: 'isPublished',
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
    <DefaultLayout title={i18n.budget}>
      <LayoutContentCard
        extra={
          <TableActionsExtra entityName={i18n.budget} onReloadClick={refetch} />
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
