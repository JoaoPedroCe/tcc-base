import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { CollectiveAgreement } from './useCollectiveAgreement'

const getCollectiveAgreements = async (
  query?: string
): Promise<ApiPaginationResult<CollectiveAgreement>> => {
  const { data } = await api.get(`admin/collectiveAgreements/${query}`)
  return data
}

export default function useCollectiveAgreements(
  query?: string
): UseQueryResult<ApiPaginationResult<CollectiveAgreement>> {
  return useQuery(
    ['collectiveAgreements', query],
    ({ queryKey: [_, query = ''] }) => getCollectiveAgreements(query)
  )
}
