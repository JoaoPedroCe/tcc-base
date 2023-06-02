import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import { ReactQueryId } from '~/utils/reactQuery'

export type CollectiveAgreement = {
  id: number
  companyName?: string
  createdAt?: string
  updatedAt?: string
  collectiveAgreementName: string
  fileName?: string
}

export type CollectiveAgreementFilters = {
  id?: string
  companyName?: string
} & ApiDefaultFilters

type getCollectiveAgreementResult = {
  id: number
} & Omit<CollectiveAgreement, 'id'>

const getCollectiveAgreement = async (
  id: ReactQueryId
): Promise<getCollectiveAgreementResult> => {
  if (!id) return {} as CollectiveAgreement
  const { data } = await api.get(`admin/collectiveAgreements/${id}`)
  return data
}

export default function useCollectiveAgreement(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getCollectiveAgreementResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getCollectiveAgreementResult, AxiosError> {
  return useQuery(
    ['collectiveAgreements', id],
    () => getCollectiveAgreement(id),
    options
  )
}
