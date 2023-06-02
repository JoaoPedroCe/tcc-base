import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import { Publication } from './usePublication'

export default function usePublicationMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, ...values }: Publication) => {
      return api({
        url: `admin/publications/${id ? `${id}` : ''}`,
        method: id ? 'PUT' : 'POST',
        data: values
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<Publication>, { id }) => {
        queryClient.setQueryData(['publication', id], data)
      }
    }
  )
}
