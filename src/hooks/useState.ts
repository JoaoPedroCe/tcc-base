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

export type State = {
  id: number
  name?: string
  abbreviation?: string
  createdBy?: BasicUserType
  lastEditBy?: BasicUserType
  createdById: number
  lastEditById: number
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

export type StateFilters = {
  id?: string
  name?: string
} & ApiDefaultFilters

type getStateResult = {
  id?: number
} & Omit<State, 'id'>

const getState = async (id: ReactQueryId): Promise<getStateResult> => {
  if (!id) return {} as State
  const { data } = await api.get(`admin/states/${id}`)
  return data
}

export default function useState(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getStateResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getStateResult, AxiosError> {
  return useQuery(['state', id], () => getState(id), options)
}
