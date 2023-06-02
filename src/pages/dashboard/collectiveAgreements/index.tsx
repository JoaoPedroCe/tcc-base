import { Space } from 'antd'
import { ColumnsType } from 'antd/lib/table'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import DisplayFiltersTags from '~/components/DisplayFiltersTags'
import DefaultLayout from '~/components/Layout/Default'
import TableFiltersModel from '~/components/Models/TableFiltersModel'
import { FilterProps } from '~/components/Models/TableFiltersModel/Filter'
import Table from '~/components/Table'
import TableActionsCell from '~/components/Table/TableActionsCell'
import {
  CollectiveAgreement,
  CollectiveAgreementFilters
} from '~/hooks/useCollectiveAgreement'
import useCollectiveAgreements from '~/hooks/useCollectiveAgreements'
import useFilters from '~/hooks/useFilters'
import i18n from '~/i18n'
import { defaultPropsTablePagination } from '~/utils/table'

const filters: Array<FilterProps<CollectiveAgreementFilters>> = [
  {
    type: 'input',
    label: i18n.companyName,
    name: 'companyName',
    rules: [{ max: 200 }],
    tag: (value: string) => i18n.filterWith(i18n.companyName, value)
  }
]

const CollectiveAgreements = () => {
  const { query, values, setFilter, setFilters, setTableFilters } =
    useFilters<CollectiveAgreementFilters>()
  const { data, isFetching, refetch } = useCollectiveAgreements(query)
  const { data: collectiveAgreements, meta } = data || {}
  const columns: ColumnsType<CollectiveAgreement> = [
    {
      title: i18n.company,
      dataIndex: 'companyName',
      sorter: true
    },
    {
      title: i18n.collectiveAgreementsName,
      dataIndex: 'collectiveAgreementName',
      sorter: true
    },
    {
      dataIndex: 'id',
      title: i18n.actions,
      render: (_, record) => (
        <Space>
          <TableActionsCell
            {...record}
            destroyRoute="collectiveAgreements"
            nameField="companyName"
            entity={i18n.company}
            onDestroy={refetch}
          />
        </Space>
      ),
      className: 'table-actions'
    }
  ]
  return <DefaultLayout title={i18n.schedules}></DefaultLayout>
}

export default CollectiveAgreements
