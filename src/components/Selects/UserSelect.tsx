import { useEffect } from 'react'

import { Select, SelectProps } from 'antd'
import { isEqual, isUndefined } from 'lodash'

import useFilters from '~/hooks/useFilters'
import { UserFilters } from '~/hooks/useUser'
import useUsers from '~/hooks/useUsers'

type UserSelectProps = {
  initialFilters?: UserFilters
  filters?: UserFilters
  searchField?: string
} & SelectProps

const UserSelect = ({
  initialFilters = {},
  filters,
  searchField = 'name',
  ...props
}: UserSelectProps) => {
  const { query, values, setFilter, setFilters } = useFilters({
    initialFilters,
    replaceUrl: false
  })

  const { data, isFetching } = useUsers(query)
  const { data: users = [] } = data || {}

  function onSearch(value: string) {
    setFilter(searchField as string, value)
  }

  useEffect(() => {
    if (!isUndefined(filters) && !isEqual(values, filters)) {
      setFilters(filters)
    }
  }, [values, filters, setFilters])

  return (
    <Select
      onSearch={onSearch}
      searchValue={values.name}
      loading={isFetching}
      filterOption={false}
      options={users.map(({ name, id, ...user }) => ({
        label: name,
        value: id,
        ...user
      }))}
      {...props}
    />
  )
}

export default UserSelect
