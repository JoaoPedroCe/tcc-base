import { Select, SelectProps } from 'antd'

import i18n from '~/i18n'

type isFromTheCategoryProps = SelectProps

const isFromCategoryOptions = [
  { label: 'Suv', value: 'SUV' },
  { label: 'Hatch', value: 'HATCH' },
  { label: 'Sedan', value: 'SEDAN' },
  { label: 'Coupé', value: 'COUPÉ' },
  { label: 'Conversível', value: 'CONVERSÍVEL' },
  { label: 'Caminhonete', value: 'CAMINHONETE' },
]

const CategoryType = (props: isFromTheCategoryProps) => {
  return <Select {...props} options={isFromCategoryOptions} />
}
export default CategoryType
