import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import type { ReactQueryId } from '~/utils/reactQuery'

export type Vehicle = {
  id: number
  model: string
  year: string
  brand: string
  annotations: string
  plate: string
  category: string
  document: string
}

type getUserResult = {
  id?: number
} & Omit<Vehicle, 'id'>

const getVehicle = async (id: ReactQueryId): Promise<getUserResult> => {
  if (!id) return {} as Vehicle
  const { data } = await api.get(`admin/vehicle/${id}`)
  return data
}

export default function useVehicle(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getUserResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getUserResult, AxiosError> {
  return useQuery(['vehicle', id], () => getVehicle(id), options)
}
