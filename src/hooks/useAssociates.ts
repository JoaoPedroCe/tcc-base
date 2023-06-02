
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { Associate } from './useAssociate'


const getAssociates = async (query?: string): Promise<ApiPaginationResult<Associate>> => {
  const { data } = await api.get(`admin/associates/${query}`)
  return data
}

export default function useAssociates(
  query?: string
): UseQueryResult<ApiPaginationResult<Associate>> {
  return useQuery(['associates', query], ({ queryKey: [_, query = ''] }) =>
    getAssociates(query)
  )
}
