import { useQuery, UseQueryResult } from '@tanstack/react-query'

import type { Publication } from '~/hooks/usePublication'
import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

const getPublications = async (query?: string): Promise<ApiPaginationResult<Publication>> => {
  const { data } = await api.get(`admin/publications/${query}`)
  return data
}

export default function usePublications(
  query?: string
): UseQueryResult<ApiPaginationResult<Publication>> {
  return useQuery(['publications', query], ({ queryKey: [_, query = ''] }) =>
  getPublications(query)
  )
}
