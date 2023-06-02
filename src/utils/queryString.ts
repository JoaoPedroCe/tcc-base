import { stringify } from 'query-string'
export function getQueryString<F = any>(filters: F): string {
  return stringify(filters, {
    skipNull: false,
    skipEmptyString: true
  })
}
