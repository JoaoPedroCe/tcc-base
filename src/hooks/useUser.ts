
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import api from '~/services/api'
import { ApiDefaultFilters } from '~/types'
import type { ReactQueryId } from '~/utils/reactQuery'


export const UserType = {
  user: 'user',
  associate: 'associate',
} as const

export type TypeUserType = typeof UserType[keyof typeof UserType]

export type User = {
  id: number
  name?: string
  username?: string
  cpf?: string
  type?: TypeUserType
  email: string
  avatarUrl?: string
  isStaff: boolean
  isActive: boolean
  createdBy?: BasicUserType
  lastEditBy?: BasicUserType
  createdById: number
  lastEditById: number
  createdAt?: string
  updatedAt?: string
  active?: boolean
}

export type BasicUserType = Pick<User, 'id' | 'name'>

export type UserFilters = {
  id?: string
  name?: string
  cpf?: string
  email?: string
  username?: string
} & ApiDefaultFilters

type getUserResult = {
  id?: number
} & Omit<User, 'id'>

const getUser = async (id: ReactQueryId): Promise<getUserResult> => {
  if (!id) return {} as User
  const { data } = await api.get(`admin/users/${id}`)
  return data
}

export default function useUser(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getUserResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getUserResult, AxiosError> {
  return useQuery(['user', id], () => getUser(id), options)
}
