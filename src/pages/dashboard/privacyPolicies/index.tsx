import React, { useEffect, useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile } from 'antd'
import type { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import TableActionsExtra from '~/components/Cards/LayoutContentCard/Extras/TableActionsExtra'
import DisplayFiltersTags from '~/components/DisplayFiltersTags'
import DefaultLayout from '~/components/Layout/Default'
import TableFiltersModel from '~/components/Models/TableFiltersModel'
import type { FilterProps } from '~/components/Models/TableFiltersModel/Filter'
import Table from '~/components/Table'
import {
  PRIVACY_POLICY_FILE_GET_URL,
  PRIVACY_POLICY_FILE_UPLOAD_URL
} from '~/constants'
import useFilters from '~/hooks/useFilters'
import usePrivacyPolicies from '~/hooks/usePrivacyPolicies'
import { User, UserFilters } from '~/hooks/useUser'
import useUsersAcceptedPrivacyPolicies from '~/hooks/useUsersAcceptedPrivacyPolicies'
import i18n from '~/i18n'
import api from '~/services/api'
import { defaultPropsTablePagination } from '~/utils/table'

const filters: Array<FilterProps<UserFilters>> = [
  {
    type: 'input',
    label: i18n.name,
    name: 'name',
    rules: [{ max: 200 }],
    tag: (value: string) => i18n.filterWith(i18n.name, value)
  }
]

const UsersAcceptedPrivacyPolicies = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { data: privacyPolicyData } = usePrivacyPolicies()
  const { id, fileUrl } = privacyPolicyData || {}
  const { query, values, setFilter, setFilters, setTableFilters } =
    useFilters<UserFilters>()
  const { data: usersAcceptedPrivacyPoliciesData, isFetching } =
    useUsersAcceptedPrivacyPolicies(query)
  const { data: usersAcceptedPrivacyPolicies, meta } =
    usersAcceptedPrivacyPoliciesData || {}
  const columns: ColumnsType<User> = [
    {
      title: i18n.associate,
      dataIndex: 'name',
      sorter: true
    },
    {
      title: i18n.acceptData,
      dataIndex: 'acceptedTermsDate',
      sorter: true,
      render: acceptedTermsDate =>
        dayjs(acceptedTermsDate)?.format('DD/MM/YYYY - hh:mm:ss')
    }
  ]

  useEffect(() => {
    if (id && fileUrl) {
      setFileList([
        {
          uid: id.toString(),
          name: fileUrl.toString(),
          status: 'done',
          url: PRIVACY_POLICY_FILE_GET_URL
        }
      ])
    }
  }, [fileUrl, id])
  return (
    <DefaultLayout title={i18n.privacyPolicy}>
      <LayoutContentCard
        extra={<TableActionsExtra entityName={i18n.user} add={true} />}
      >
        <Upload
          headers={{ Authorization: api.defaults.headers['Authorization'] }}
          accept=".pdf"
          maxCount={1}
          action={PRIVACY_POLICY_FILE_UPLOAD_URL}
          method="POST"
          fileList={fileList}
          onChange={({ fileList: nextFileList }) => setFileList(nextFileList)}
        >
          <Button icon={<UploadOutlined />}>{i18n.sendFile}</Button>
        </Upload>
        <DisplayFiltersTags
          filters={filters}
          values={values}
          onClearFilter={name => setFilter(name, null)}
        />
        <Table
          columns={columns}
          dataSource={usersAcceptedPrivacyPolicies}
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

export default UsersAcceptedPrivacyPolicies
