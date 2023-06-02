import { useState } from 'react'

import { Select, SelectProps } from 'antd'

import useAssociates from '~/hooks/useAssociates'

type PublicationTypeProps = SelectProps

const CustomerSelect = (props: PublicationTypeProps) => {
  const { data, isFetching } = useAssociates()
  const { data: customers = [] } = data || {}
  return (
    <Select
      {...props}
      loading={isFetching}
      options={customers.map(({ id, name, cellphone }) => ({
        label: `${name} - ${cellphone}`,
        value: id
      }))}
    />
  )
}

export default CustomerSelect
