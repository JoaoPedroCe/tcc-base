import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

type IbgeRegion = {
  id: number
  nome: string
  sigla: string
}

export type IbgeState = {
  id: number
  nome?: string
  sigla?: string
  regiao?: IbgeRegion
}

export type IbgeStateFilters = {
  orderBy?: string
  view?: string
}

export const getIbgeState = async (state: string) => {
  const { data } = await axios.get<IbgeState>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}`
  )
  return data
}

export default function useIbgeState(
  state: string
): UseQueryResult<Array<IbgeState>> {
  return useQuery(['ibge-state', state], ({ queryKey: [_, state] }) =>
    getIbgeState(state)
  )
}
