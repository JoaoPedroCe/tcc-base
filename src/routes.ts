import { AUTHENTICATED_INDEX_ROUTE } from './constants'
import { AnyObject } from './types'

export type CrudRouteType = {
  index: string
  add: string
  edit: (path: string) => string
}

export const CRUD_ROUTES = ['users', 'associates', 'privacyPolicies']

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
  users: getDefaultCrudRoutes('users'),
  collectiveAgreements: getDefaultCrudRoutes('collectiveAgreements'),
  privacyPolicies: getDefaultCrudRoutes('privacyPolicies'),
  associates: getDefaultCrudRoutes('associates'),
  medicalGuide: getDefaultCrudRoutes('medicalGuide'),
  publications: getDefaultCrudRoutes('publications'),
  importAssociates: getDefaultCrudRoutes('importAssociates'),
  veiculos: getDefaultCrudRoutes('veiculos'),
  settings: {
    index: AUTHENTICATED_INDEX_ROUTE + '/settings',
    crud: false
  }
}

type ROUTES_TYPE = { [key: string]: any } & typeof ROUTES

export default ROUTES as ROUTES_TYPE
