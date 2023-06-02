import { useQuery, UseQueryResult } from '@tanstack/react-query'

import type { User } from '~/hooks/useUser'
import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { Vehicle } from './useVehicle'

const getVehicles = async (
  query?: string
): Promise<ApiPaginationResult<Vehicle>> => {
  const { data } = await api.get(`admin/vehicle/${query}`)
  return data
}

export default function useVehicles(
  query?: string
): UseQueryResult<ApiPaginationResult<Vehicle>> {
  return useQuery(['vehicles', query], ({ queryKey: [_, query = ''] }) =>
    getVehicles(query)
  )
}
