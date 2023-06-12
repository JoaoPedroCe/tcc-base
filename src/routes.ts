import { AUTHENTICATED_INDEX_ROUTE } from './constants'
import { AnyObject } from './types'

export type CrudRouteType = {
  index: string
  add: string
  edit: (path: string) => string
}

export const CRUD_ROUTES = ['usuarios']

function getDefaultCrudRoutes(
  name: string,
  optsParam?: { add: boolean; edit: boolean }
): CrudRouteType {
  const opts = Object.assign({ add: true, edit: true }, optsParam || {})
  const index = AUTHENTICATED_INDEX_ROUTE + '/' + name
  return {
    index,
    ...(opts?.add && {
      add: index + '/add'
    }),
    ...(opts?.edit && {
      edit: (path: string) => index + '/edit/' + path
    })
  } as AnyObject & CrudRouteType
}

const ROUTES = {
  auth: {
    signin: '/auth/signin',
    forgot: '/auth/forgot',
    signup: '/auth/signup',
    reset: (token: string) => '/auth/signin/' + token
  },
  usuarios: getDefaultCrudRoutes('usuarios'),
  clientes: getDefaultCrudRoutes('clientes'),
  agendamentos: getDefaultCrudRoutes('agendamentos'),
  orcamentos: getDefaultCrudRoutes('orcamentos'),
  veiculos: getDefaultCrudRoutes('veiculos'),
  manutencoes: getDefaultCrudRoutes('manutencoes'),
  settings: {
    index: AUTHENTICATED_INDEX_ROUTE + '/settings',
    crud: false
  }
}

type ROUTES_TYPE = { [key: string]: any } & typeof ROUTES

export default ROUTES as ROUTES_TYPE
