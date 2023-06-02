import React from 'react'

import type { AppProps } from 'next/app'
import { Router } from 'next/router'

import { QueryClientProvider } from '@tanstack/react-query'
import NProgress from 'nprogress'

import { queryClient } from '~/utils/reactQuery'

import { AuthProvider } from '../contexts/AuthContext'

import 'nprogress/nprogress.css'

import '../styles/globals.less'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
React.useLayoutEffect = React.useEffect

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default MyApp
