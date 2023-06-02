import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { State } from './useState'

const getStates = async (
  query?: string
): Promise<ApiPaginationResult<State>> => {
  const { data } = await api.get(`admin/states/${query}`)
  return data
}

export default function useStates(
  query?: string
): UseQueryResult<ApiPaginationResult<State>> {
  return useQuery(['states', query], ({ queryKey: [_, query = ''] }) =>
    getStates(query)
  )
}
