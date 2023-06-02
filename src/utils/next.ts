import { NextCookies } from 'next/dist/server/web/spec-extension/cookies'

import { AUTH_TOKEN_NAME } from '~/constants'

export const signInRedirect = {
  redirect: {
    destination: '/auth/signin',
    permanent: false
  }
}

export const checkIsAuth = (cookies: NextCookies) => {
  return cookies.get(AUTH_TOKEN_NAME)
}
