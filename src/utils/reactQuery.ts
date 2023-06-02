import { QueryClient } from '@tanstack/react-query'

export type ReactQueryId = string | string[] | undefined | number

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const setQuery = (name: string, params: unknown): void => {
  localStorage.setItem(`${name}-query`, JSON.stringify({ name, params }))
}

export const getQuery = (name: string): Array<unknown> => {
  const { params } = JSON.parse(localStorage.getItem(`${name}-query`) || '')
  return [name, params]
}
