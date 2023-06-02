import { useQuery, UseQueryResult } from '@tanstack/react-query'
import axios from 'axios'

export type Cep = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: number
  gia: number
  ddd: number
  siafi: number
}

export const getViaCep = async (cep: string) => {
  const { data } = await axios.get<Cep>(
    `https://viacep.com.br/ws/${cep}/json/`
  )
  return data
}

export default function useViaCep(
  cep: string
): UseQueryResult<Cep> {
  return useQuery(['via-cep', cep], ({ queryKey: [_, cep] }) =>
    getViaCep(cep)
  )
}
