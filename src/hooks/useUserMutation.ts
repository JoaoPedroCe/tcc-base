import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import type { User } from './useUser'

export default function useUserMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, ...values }: User) => {
      return api({
        url: `admin/users/${id ? `${id}` : ''}`,
        method: id ? 'PUT' : 'POST',
        data: values
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<User>, { id }) => {
        queryClient.setQueryData(['user', id], data)
      }
    }
  )
}
