
import { useQuery, UseQueryResult } from '@tanstack/react-query'

import type { User } from '~/hooks/useUser'
import api from '~/services/api'
import { ApiPaginationResult } from '~/types'


const getUsers = async (query?: string): Promise<ApiPaginationResult<User>> => {
  const { data } = await api.get(`admin/users/${query}`)
  return data
}

export default function useUsers(
  query?: string
): UseQueryResult<ApiPaginationResult<User>> {
  return useQuery(['users', query], ({ queryKey: [_, query = ''] }) =>
    getUsers(query)
  )
}
