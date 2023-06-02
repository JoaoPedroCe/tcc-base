import { useEffect } from 'react'

import { Select, SelectProps } from 'antd'
import { isEqual, isUndefined } from 'lodash'

import useCountries from '~/hooks/useCountries'
import { CountryFilters } from '~/hooks/useCountry'
import useFilters from '~/hooks/useFilters'

type CountrySelectProps = {
  initialFilters?: CountryFilters
  filters?: CountryFilters
  searchField?: string
} & SelectProps

const CountrySelect = ({
  initialFilters = {},
  filters,
  searchField = 'name',
  ...props
}: CountrySelectProps) => {
  const { query, values, setFilter, setFilters } = useFilters({
    initialFilters,
    replaceUrl: false
  })

  const { data, isFetching } = useCountries(query)
  const { data: countries = [] } = data || {}

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
      options={countries.map(({ name, id, ...country }) => ({
        label: name,
        value: id,
        ...country
      }))}
      {...props}
    />
  )
}

export default CountrySelect
