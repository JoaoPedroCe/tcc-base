import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import { Publication } from './usePublication'
import { Vehicle } from './useVehicle'

export default function useVehicleMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    ({ id, ...values }: Vehicle) => {
      return api({
        url: `admin/vehicle/${id ? `${id}` : ''}`,
        method: id ? 'PUT' : 'POST',
        data: values
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<Vehicle>, { id }: Vehicle) => {
        queryClient.setQueryData(['vehicle', id], data)
      }
    }
  )
}
