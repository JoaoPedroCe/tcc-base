import { setCookie } from 'nookies'

import { AUTH_TOKEN_NAME, AUTH_TOKEN_TIME } from '~/constants'
import { SignInData, AuthUser} from '~/contexts/AuthContext'

import api from './api'

export type SignInRequestData = {
  email: string
  password: string
}

export type signInRequestResult = {
  user: AuthUser
  token: string
}

export type SignUpRequestData = {
  name: string
  password_confirmation: string
} & SignInRequestData

const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount))

export async function signInRequest(
  signInData: SignInData
): Promise<signInRequestResult> {
  const { data } = await api.post<signInRequestResult>('auth/login', signInData)
  return data
}

export async function signUpRequest(signUpData: SignUpRequestData) {
  const { data } = await api.post<string>('auth/register', signUpData)
  return data
}

export function SetAuthenticationToken(token: string){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
  setCookie(undefined, AUTH_TOKEN_NAME, token, {
    maxAge: AUTH_TOKEN_TIME,
    path: '/'
  })
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'test',
      email: 'test@test.com.br',
      avatar_url: 'test.png'
    }
  }
}
