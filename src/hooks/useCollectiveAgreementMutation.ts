import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import { CollectiveAgreement } from './useCollectiveAgreement'

export default function useCollectiveAgreementMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, ...values }: CollectiveAgreement) => {
      return api({
        url: `admin/collectiveAgreements/${id ? `${id}` : ''}`,
        method: id ? 'PUT' : 'POST',
        data: values
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<CollectiveAgreement>, { id }) => {
        queryClient.setQueryData(['collectiveAgreement', id], data)
      }
    }
  )
}
