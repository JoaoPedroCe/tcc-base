import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { User } from './useUser'

const getUsersAcceptedPrivacyPolicies = async (
  query?: string
): Promise<ApiPaginationResult<User>> => {
  const { data } = await api.get(`admin/associateAcceptedPrivacyPolicy/${query}`)
  return data
}

export default function useUsersAcceptedPrivacyPolicies(
  query?: string
): UseQueryResult<ApiPaginationResult<User>> {
  return useQuery(
    ['usersAcceptedPrivacyPolicies', query],
    ({ queryKey: [_, query = ''] }) => getUsersAcceptedPrivacyPolicies(query)
  )
}
