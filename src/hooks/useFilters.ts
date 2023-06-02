import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import type { TablePaginationConfig } from 'antd'
import type {
  FilterValue,
  SorterResult,
  TableCurrentDataSource
} from 'antd/lib/table/interface'
import { omitBy, isNil, debounce, isUndefined, isObject, isArray } from 'lodash'
import { parse } from 'query-string'

import { AnyObject } from '~/types'
import { getQueryString } from '~/utils/queryString'
import { urlReplace } from '~/utils/url'

export type useFiltersOptions<F> = {
  initialFilters?: F
  debounce?: boolean
  updateQuery?: boolean
  replaceUrl?: boolean
}

export type useFiltersResult<F> = {
  query: string
  values: F
  setValues: Dispatch<SetStateAction<F>>
  filters: F
  setFilter: (name: string, nextValue: string | number | any[] | null) => void
  setFilters: (nextFilters: F, options?: useFiltersOptions<F>) => void
  setTableFilters: (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    _extra: TableCurrentDataSource<any>
  ) => void
}

function getLocationQuery() {
  const { search, pathname } =
    typeof window !== 'undefined' ? window.location : ({} as Location)
  if (!search) return ''
  const localSearch = localStorage.getItem(pathname)
  return localSearch ? JSON.parse(localSearch) : parse(search)
}

function formatFilterValueToQuery(value: any) {
  if (isObject(value)) return (value as AnyObject)?.value
  if (isArray(value) && value.every(v => isObject(v))) {
    return value.map(v => v.value).join()
  }
  return value
}

export default function useFilters<F>(
  defaultOptions: useFiltersOptions<F> = {}
): useFiltersResult<F> {
  const [initialFilters, setInitialFilters] = useState<F>({} as F)
  const [query, _setQuery] = useState<string>('')
  const [values, setValues] = useState<F>(initialFilters)
  const [filters, _setFilters] = useState<F>(initialFilters)
  const [pathname, setPathname] = useState('')

  const getOptions = useCallback(
    (options?: useFiltersOptions<F>) => {
      const {
        debounce = false,
        updateQuery = true,
        replaceUrl = true,
        initialFilters
      } = defaultOptions
      return {
        debounce,
        updateQuery,
        replaceUrl,
        initialFilters,
        ...(!isUndefined(options) && options)
      }
    },
    [defaultOptions]
  )

  function setQuery(nextFilters: F) {
    const { replaceUrl } = getOptions()
    localStorage.removeItem(pathname)
    let nextQueryValues = omitBy(nextFilters, isNil)
    localStorage.setItem(pathname, JSON.stringify(nextFilters))
    nextQueryValues = Object.keys(nextFilters).reduce((fs: AnyObject, key) => {
      fs[key] = formatFilterValueToQuery(nextFilters[key as keyof F])
      return fs
    }, {})
    _setQuery(getQueryString(nextQueryValues))
    if (replaceUrl) urlReplace(nextQueryValues)
  }

  const setFiltersWithDebounce = useRef(
    debounce((nextFilters: F) => {
      _setFilters(nextFilters)
      setQuery(nextFilters)
    }, 700)
  ).current

  function setFilter(
    name: string,
    nextValue: string | number | any[] | null,
    options: useFiltersOptions<F> = {}
  ) {
    const { debounce, updateQuery } = getOptions(options)

    const nextValues = omitBy(
      { ...values, [name]: nextValue },
      isNil
    ) as unknown as F

    setValues(nextValues)

    if (debounce) return setFiltersWithDebounce(nextValues)
    if (!debounce && updateQuery) setQuery(nextValues)
    if (!debounce) _setFilters(nextValues)
  }

  function setFilters(nextFilters: F, options?: useFiltersOptions<F>) {
    const { updateQuery } = getOptions(options)
    _setFilters(nextFilters)
    setValues(nextFilters)
    if (updateQuery) setQuery(nextFilters)
  }

  function setTableFilters(
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    _extra: TableCurrentDataSource<any>
  ) {
    const { current: page, pageSize: limit } = pagination
    const { order, field } = sorter as SorterResult<any>

    const nextFilters = omitBy(
      {
        ...filters,
        page,
        perPage: limit,
        sortType: order === 'descend' ? 'desc' : 'asc',
        sortColumn: field
      },
      isNil
    ) as unknown as F

    setValues(nextFilters)
    _setFilters(nextFilters)
    setQuery(nextFilters)
  }

  useEffect(() => {
    const nextPathname = typeof window !== 'undefined' && location.pathname
    const { initialFilters: initialFs, replaceUrl } = getOptions()
    const nextInitialFilters = {
      ...initialFs,
      ...(replaceUrl && { ...getLocationQuery() })
    } as F
    setInitialFilters(nextInitialFilters)
    _setQuery(getQueryString(nextInitialFilters))
    setValues(nextInitialFilters)
    if (nextPathname) setPathname(nextPathname)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    query: '?' + query,
    values,
    setValues,
    filters,
    setFilter,
    setFilters,
    setTableFilters
  }
}
