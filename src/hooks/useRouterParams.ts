import { useRouter } from 'next/router'

import type { ParsedUrlQuery } from 'querystring'

type useRouterParamsResult = ParsedUrlQuery & {
  id?: string | string[] | undefined
}

export default function useRouterParams<PS>(): useRouterParamsResult & PS {
  const { query } = useRouter()
  const { id, ...rest } = query as unknown as useRouterParamsResult & PS
  return {
    id: id === 'add' ? undefined : id,
    ...rest
  } as useRouterParamsResult & PS
}
