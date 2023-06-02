import { Space, Tag } from 'antd'
import { isUndefined } from 'lodash'

import i18n from '~/i18n'

import { FilterProps } from './Models/TableFiltersModel/Filter'

type DisplayFiltersTagProps = {
  filters: Array<FilterProps<any>>
  values: { [key in string]: any }
  onClearFilter?: (name: string) => void
}

const BYPASS_FILTERS_NAMES = ['page', 'perPage', 'sortColumn', 'sortType']

const DisplayFiltersTag = ({
  filters,
  values,
  onClearFilter: onClearFilterProp
}: DisplayFiltersTagProps) => {
  function onClearFilter(name: string) {
    if (onClearFilterProp) onClearFilterProp(name)
  }

  function formatValueToTag(value: any): string {
    if (Array.isArray(value)) {
      return value.map(v => i18n[v]).join(', ')
    }
    return i18n[value] || value
  }

  function renderTag(name: string) {
    if (BYPASS_FILTERS_NAMES.includes(name)) return
    const value = values[name]
    if (value === null || isUndefined(value)) return
    const { tag } = filters.find(({ name: n }) => n === name) || {}

    return (
      <Tag
        key={name}
        closable
        onClose={() => onClearFilter(name)}
        className="flex items-center"
        color="var(--primary-color)"
      >
        {tag ? tag(value) : formatValueToTag(value)}
      </Tag>
    )
  }

  return (
    <Space className="flex mb-2">
      {Object.keys(values).map(name => renderTag(name))}
    </Space>
  )
}

export default DisplayFiltersTag
