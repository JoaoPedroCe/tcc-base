import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Dayjs } from 'dayjs'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import type { ReactQueryId } from '~/utils/reactQuery'

import { Country } from './useCountry'
import { State } from './useState'
import { TypeUserType } from './useUser'

export type Associate = {
  id: number
  name?: string
  username?: string
  cpf?: string
  type?: TypeUserType
  cellphone?: string
  email: string
  address?: string
  avatarUrl?: string
  zipCode?: string
  city?: string
  complement?: string
  countryId?: number
  genre?: string
  country?: Country
  stateAbbreviation?: string
  stateId?: number
  state?: State
  birthDate?: string | Dayjs
  isStaff: boolean
  isActive: boolean
  createdBy?: BasicAssociateType
  lastEditBy?: BasicAssociateType
  createdById: number
  lastEditById: number
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

export type BasicAssociateType = Pick<Associate, 'id' | 'name'>

export type AssociateFilters = {
  id?: string
  name?: string
  cpf?: string
  email?: string
  username?: string
  type?: TypeUserType
  phone?: string
  cellphone?: string
  company?: string
  birthDate?: string
} & ApiDefaultFilters

type getAssociateResult = {
  id?: number
} & Omit<Associate, 'id'>

const getAssociate = async (id: ReactQueryId): Promise<getAssociateResult> => {
  if (!id) return {} as Associate
  const { data } = await api.get(`admin/associates/${id}`)
  return data
}

export default function useAssociate(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getAssociateResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getAssociateResult, AxiosError> {
  return useQuery(['associate', id], () => getAssociate(id), options)
}
