import { notification } from 'antd'
import { AxiosError } from 'axios'

import i18n from '~/i18n'

export type responseErrorsResult = Array<{
  error: string[]
  row: string[]
  field: string[]
  value: string[]
}>

type ApiResponseReporter = {
  error: string[]
  row: string[]
  field: string[]
  value: string[]
}

export const responseImportErrors = (
  e: AxiosError | Error | unknown
): responseErrorsResult => {
  if (Object.prototype.hasOwnProperty.call(e, 'response')) {
    const { response } = e as AxiosError
    const errors = response?.data as Array<ApiResponseReporter>
    errors.map(({ error, row, field, value }) => {
      return notification.error({
        message: 'Inválido',
        description: i18n.importAssociatesError.invalid(row, field, error,value),
        duration: 300
      })
    })
  }
  return []
}
