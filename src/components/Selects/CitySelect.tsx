import { Select, SelectProps } from 'antd'

import useIbgeCities from '~/hooks/useIbgeCities'
import { State } from '~/hooks/useState'

type CitySelectProps = {
  UF: State
} & SelectProps

const CitySelect = ({ UF, ...props }: CitySelectProps) => {
  const { data: cities = [], isFetching } = useIbgeCities(UF.abbreviation || '')

  return (
    <Select
      loading={isFetching}
      filterOption={false}
      options={cities.map(({ nome, ...state }) => ({
        label: nome,
        value: nome,
        ...state
      }))}
      {...props}
    />
  )
}

export default CitySelect
