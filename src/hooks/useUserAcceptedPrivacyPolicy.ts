import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import type { ReactQueryId } from '~/utils/reactQuery'

export type UserAcceptedPrivacyPolicy = {
  id?: number
  createdAt?: string
  privacyPolicyId?: number
  userId?: number
  user?: string
}

export type UserAcceptedPrivacyPolicyIdPrivacyPolicy = {
  privacyPolicyId?: number
}

export type UserAcceptedPrivacyPolicyFilters = {
  id?: string
  name?: string
} & ApiDefaultFilters

type getUserAcceptedPrivacyPolicyResult = {
  id?: number
} & Omit<UserAcceptedPrivacyPolicy, 'id'>

const getUserAcceptedPrivacyPolicy = async (
  id: ReactQueryId
): Promise<getUserAcceptedPrivacyPolicyResult> => {
  if (!id) return {} as UserAcceptedPrivacyPolicy
  const { data } = await api.get(`admin/associateAcceptedPrivacyPolicy/${id}`)
  return data
}

export default function useUserAcceptedPrivacyPolicy(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getUserAcceptedPrivacyPolicyResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getUserAcceptedPrivacyPolicyResult, AxiosError> {
  return useQuery(
    ['userAcceptedPrivacyPolicy', id],
    () => getUserAcceptedPrivacyPolicy(id),
    options
  )
}
