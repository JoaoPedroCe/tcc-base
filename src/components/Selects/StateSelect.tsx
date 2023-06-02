import { useEffect } from 'react'

import { Select, SelectProps } from 'antd'
import { isEqual, isUndefined } from 'lodash'

import useFilters from '~/hooks/useFilters'
import { StateFilters } from '~/hooks/useState'
import useStates from '~/hooks/useStates'

type StateSelectProps = {
  initialFilters?: StateFilters
  filters?: StateFilters
  searchField?: string
} & SelectProps

const StateSelect = ({
  initialFilters = {},
  filters,
  searchField = 'name',
  ...props
}: StateSelectProps) => {
  const { query, values, setFilter, setFilters } = useFilters({
    initialFilters,
    replaceUrl: false
  })

  const { data, isFetching } = useStates(query)
  const { data: states = [] } = data || {}

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
      options={states.map(({ name, id, ...state }) => ({
        label: name,
        value: id,
        ...state
      }))}
      {...props}
    />
  )
}

export default StateSelect
