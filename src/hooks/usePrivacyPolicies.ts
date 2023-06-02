import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { PrivacyPolicy } from './usePrivacyPolicy'

const getPrivacyPolicies = async (query?: string): Promise<ApiPaginationResult<PrivacyPolicy>> => {
  const { data } = await api.get(`admin/privacyPolicy/${query}`)
  return data
}

export default function usePrivacyPolicies(
  query?: string
): UseQueryResult<PrivacyPolicy> {
  return useQuery(['privacyPolicies', query], ({ queryKey: [_, query = ''] }) =>
    getPrivacyPolicies(query)
  )
}
