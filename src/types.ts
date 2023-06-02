export type GetTypeofProperty<TObj, TProp extends keyof TObj> = TObj[TProp]

export type AnyObject = { [key: string]: any }

export type ApiPaginationMetaResult = {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string | null
  previous_page_url: string | null
}

export type ApiPaginationResult<D = unknown> = {
  meta: ApiPaginationMetaResult
  data: Array<D>
}

export type ApiDefaultFilters = {
  page?: number
  perPage?: number
  sortType?: string
  sortColumn?: string
}
