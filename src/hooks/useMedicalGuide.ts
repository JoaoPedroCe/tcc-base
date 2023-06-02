import { useQuery, UseQueryResult } from '@tanstack/react-query'

import api from '~/services/api'

export type MedicalGuide = {
  id: number
  name?: string
  city?: string
  state?: string
}

const getMedicalGuide = async (
  query?: string
): Promise<Array<MedicalGuide>> => {
  const { data } = await api.get(`admin/medicalGuide/${query}`)
  return data
}

export default function useMedicalGuide(): UseQueryResult<Array<MedicalGuide>> {
  return useQuery(['medicalGuide'], ({ queryKey: [_, query = ''] }) =>
    getMedicalGuide(query)
  )
}
