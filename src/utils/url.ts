import { getQueryString } from './queryString'

export function urlReplace(value: any): void {
  const { history, location } = window
  history.pushState(null, '', `${location.pathname}?${getQueryString(value)}`)
}
