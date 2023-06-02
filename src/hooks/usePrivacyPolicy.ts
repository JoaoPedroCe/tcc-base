import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import api from '~/services/api'
import { ReactQueryId } from '~/utils/reactQuery'

export type PrivacyPolicy = {
  id: number
  createdAt?: string
  createdById?: number
  fileUrl: string
}

type getPrivacyPolicyResult = {
  id?: number
} & Omit<PrivacyPolicy, 'id'>

const getPrivacyPolicy = async (
  id: ReactQueryId
): Promise<getPrivacyPolicyResult> => {
  if (!id) return {} as PrivacyPolicy
  const { data } = await api.get(`admin/privacyPolicy/${id}`)
  return data
}

export default function usePrivacyPolicy(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getPrivacyPolicyResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getPrivacyPolicyResult, AxiosError> {
  return useQuery(
    ['privacyPolicy', id],
    () => getPrivacyPolicy(id),
    options
  )
}
