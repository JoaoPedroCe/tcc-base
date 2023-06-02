import { Select, SelectProps } from 'antd'

import i18n from '~/i18n'

type PublicationTypeProps = SelectProps

const publicationTypeOptions = [
  { label: i18n.benefits, value: 'Benefícios' },
  { label: i18n.news, value: 'Notícias' }
]

const PublicationTypeSelect = (props: PublicationTypeProps) => {
  return <Select {...props} options={publicationTypeOptions} />
}
export default PublicationTypeSelect
