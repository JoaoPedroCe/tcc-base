import { Select, SelectProps } from 'antd'

import i18n from '~/i18n'

type GenreSelectProps = SelectProps

const genres = [
  { label: i18n.male, value: 'male' },
  { label: i18n.female, value: 'female' }
]

const GenreSelect = (props: GenreSelectProps) => {
  return <Select {...props} options={genres} />
}
export default GenreSelect
