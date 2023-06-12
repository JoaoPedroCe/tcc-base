import { Space } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import ScheduleCard from '~/components/Cards/ScheduleCard'
import ScheduleColumn from '~/components/Columns/ScheduleColumn'
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
  return (
    <DefaultLayout title={i18n.schedules}>
      <LayoutContentCard
        extra={
          <TableActionsExtra entityName={i18n.budget} onReloadClick={refetch} />
        }
      >
        <ScheduleColumn
          title="Agendamentos para"
          date={'01/06/2023'}
        >
          <ScheduleCard
            time="15:00"
            customer="João Pedro Oliveira Cedan"
            status="Compareceu"
            vehicle="Civic"
            vehiclePlate="PKL-2541"
            cellphone={'(34) 99812-5563'}
            color="#55A630"
          />
          <ScheduleCard
            time="16:00"
            customer="Maria Victoria"
            status="Cancelado"
            vehicle="Gol g5"
            vehiclePlate="UEG-2481"
            cellphone={'(11) 44444-3333'}
            color="#ADB5BD"
          />
          <ScheduleCard
            time="17:45"
            customer="Geraldo"
            status="Faltou"
            vehicle="Corolla"
            vehiclePlate="FJC-5296"
            cellphone={'(16) 88442-0000'}
            color="#D00000"
          />
          <ScheduleCard
            time="17:45"
            customer="Any"
            status="Agendado"
            vehicle="Golf GTI"
            vehiclePlate="LPL-6489"
            cellphone={'(17) 77777-2222'}
            color="#FFBA08"
          />
        </ScheduleColumn>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default CollectiveAgreements
