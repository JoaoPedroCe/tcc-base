import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

import { IbgeState } from './useIbgeState'

type IbgeMesorregiao = {
  id: number
  nome: string
  UF: IbgeState
}

type IbgeMicrorregiao = {
  id: number
  nome: string
  mesorregiao?: IbgeMesorregiao
}

export type IbgeCity = {
  id: number
  nome: string
  sigla?: string
  microrregiao?: IbgeMicrorregiao
}

export const getIbgeCities = async (state: string) => {
  const { data } = await axios.get<Array<IbgeCity>>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`
  )
  return data
}

export default function useIbgeCities(
  state: string
): UseQueryResult<Array<IbgeCity>> {
  return useQuery(['ibge-cities', state], ({ queryKey: [_, state] }) =>
    getIbgeCities(state)
  )
}
