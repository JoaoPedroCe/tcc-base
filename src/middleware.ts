import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { checkIsAuth } from '~/utils/next'

const SignInRoute = '/auth/signin'
const DashboardRoute = '/dashboard'

export function middleware(request: NextRequest) {
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')
  const isAuthenticated = checkIsAuth(request.cookies)
  const IndexRoute = isAuthenticated ? DashboardRoute : SignInRoute

  if (request.nextUrl.pathname == '/' || (isAuthRoute && isAuthenticated)) {
    return NextResponse.redirect(new URL(IndexRoute, request.url))
  }

  if (!isAuthRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(SignInRoute, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/auth/:path*', '/dashboard/:path*']
}
