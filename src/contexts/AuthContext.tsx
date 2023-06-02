import React, { createContext, useEffect, useState } from 'react'

import Router from 'next/router'

import { getCookie } from 'cookies-next'
import { destroyCookie } from 'nookies'
import createPersistedState from 'use-persisted-state'

import { AUTH_TOKEN_NAME } from '~/constants'
import { signInRequest, signInRequestResult } from '~/services/auth'

export const useUserState = createPersistedState<AuthUser>('user')

export type AuthUser = {
  id: number
  name: string
  email: string
  avatar: string | string
  verifiedEmail: boolean
  rememberMeToken: boolean
  createdAt: string
  updatedAt: string
  acceptedTerms: boolean
}

export type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: AuthUser
  signIn: (data: SignInData) => Promise<signInRequestResult>
  singOut: () => void
}

type AuthProviderProps = {
  children: React.ReactElement | Array<React.ReactElement>
}

export const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useUserState({} as AuthUser)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password
    })
    setUser(user)
    return { token, user }
  }

  async function singOut() {
    destroyCookie(undefined, AUTH_TOKEN_NAME, { path: '/' })
    setUser({} as AuthUser)
    Router.push('/')
  }

  useEffect(() => {
    setIsAuthenticated(getCookie(AUTH_TOKEN_NAME) as boolean)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, singOut }}>
      {children}
    </AuthContext.Provider>
  )
}
