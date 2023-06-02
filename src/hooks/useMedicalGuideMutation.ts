import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

import api from '~/services/api'

import { MedicalGuide } from './useMedicalGuide'

export default function useMedicalGuideMutation() {
  const queryClient = useQueryClient()

  return useMutation(
    (values: Array<MedicalGuide>) => {
      return api({
        url: `admin/medicalGuide`,
        method: 'POST',
        data: { cities: values }
      })
    },
    {
      onSuccess: ({ data }: AxiosResponse<MedicalGuide>) => {
        queryClient.setQueryData(['medicalGuide'], data)
      }
    }
  )
}
