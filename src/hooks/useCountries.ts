import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'
import { ApiPaginationResult } from '~/types'

import { Country } from './useCountry'

const getCountries = async (
  query?: string
): Promise<ApiPaginationResult<Country>> => {
  const { data } = await api.get(`admin/countries/${query}`)
  return data
}

export default function useCountries(
  query?: string
): UseQueryResult<ApiPaginationResult<Country>> {
  return useQuery(['countries', query], ({ queryKey: [_, query = ''] }) =>
    getCountries(query)
  )
}
