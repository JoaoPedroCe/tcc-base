import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import { Associate } from './useAssociate'


export default function useAssociateMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, ...values }:  Associate) => {
      return api({
        url: `admin/associates/${id ? `${id}` : ''}`,
        method: id ? 'PUT' : 'POST',
        data: values
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<Associate>, { id }) => {
        queryClient.setQueryData(['associate', id], data)
      }
    }
  )
}
