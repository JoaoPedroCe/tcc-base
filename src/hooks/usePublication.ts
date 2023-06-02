import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import api from '~/services/api'
import type { ReactQueryId } from '~/utils/reactQuery'

export const PublicationType = {
  news: 'notícia',
  benefit: 'benefícios'
} as const
export type PublicationLink = {
  name: string
  linkUrl: string
}

type TypePublicationType = typeof PublicationType[keyof typeof PublicationType]

export type Publication = {
  id?: number
  title?: string
  type?: TypePublicationType
  mediaFileUrl?: string
  description?: string
  isPublished: string
  links: Array<PublicationLink>
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  stateId?: number
  city?: string
}

type getPublicationResult = {
  id?: number
} & Omit<Publication, 'id'>

const getPublication = async (
  id: ReactQueryId
): Promise<getPublicationResult> => {
  if (!id) return {} as Publication
  const { data } = await api.get(`admin/publications/${id}`)
  return data
}

export default function usePublication(
  id: ReactQueryId,
  options?: Omit<
    UseQueryOptions<getPublicationResult, AxiosError>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<getPublicationResult, AxiosError> {
  return useQuery(['publications', id], () => getPublication(id), options)
}
