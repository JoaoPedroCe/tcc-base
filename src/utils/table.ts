import type { TablePaginationConfig } from 'antd'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource
} from 'antd/lib/table/interface'
import { omitBy, isNil } from 'lodash'

import { TABLE_PAGE_SIZE_OPTIONS } from '~/constants'
import { ApiPaginationMetaResult } from '~/types'

export const defaultPropsTable = {
  scroll: { x: true }
}

export const defaultPropsTablePagination = (
  meta: ApiPaginationMetaResult | undefined
) => {
  const { total = 0, per_page: pageSize = 0 } = meta || {}
  return {
    total,
    pageSize,
    pageSizeOptions: TABLE_PAGE_SIZE_OPTIONS,
    showSizeChanger: true
  }
}

export const formatTableFilters = (
  pagination: TablePaginationConfig,
  _filters: Record<string, FilterValue | null>,
  sorter: SorterResult<any> | SorterResult<any>[],
  _extra: TableCurrentDataSource<any>
) => {
  const { current: page, pageSize: limit } = pagination
  const { order, field } = sorter as SorterResult<any>

  const nextFilters = omitBy(
    {
      page,
      perPage: limit,
      sortType: order,
      sortColumn: field
    },
    isNil
  )

  return nextFilters
}
