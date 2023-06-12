import { useState } from 'react'

import { Select, SelectProps } from 'antd'

import usePublications from '~/hooks/usePublications'

type PublicationTypeProps = SelectProps

const BudgetSelect = (props: PublicationTypeProps) => {
  const { data, isFetching } = usePublications()
  const { data: customers = [] } = data || {}
  return (
    <Select
      {...props}
      loading={isFetching}
      options={customers.map(({ id, title, isPublished }) => ({
        label: `${title} - ${isPublished}`,
        value: id
      }))}
    />
  )
}

export default BudgetSelect
