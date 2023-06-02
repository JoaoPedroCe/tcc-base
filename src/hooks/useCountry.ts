
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import type { ReactQueryId } from '~/utils/reactQuery'

import { BasicUserType } from './useUser'

export type Country = {
  id: number
  name?: string
  createdBy?: BasicUserType
  lastEditBy?: BasicUserType
  createdById: number
  lastEditById: number
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

export type CountryFilters = {
  id?: string
  name?: string
} & ApiDefaultFilters

type getCountryResult = {
  id?: number
} & Omit<Country, 'id'>

const getCountry = async (id: ReactQueryId): Promise<getCountryResult> => {
  if (!id) return {} as Country
  const { data } = await api.get(`admin/countries/${id}`)
  return data
}

export default function useCountry(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getCountryResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getCountryResult, AxiosError> {
  return useQuery(['country', id], () => getCountry(id), options)
}
