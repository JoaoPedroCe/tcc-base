import { notification } from 'antd'
import { AxiosError } from 'axios'
import moment from 'moment'

import i18n from '~/i18n'

export const rules = {
  string: {
    required: {
      message: 'Esse campo é obrigatório',
      required: true
    }
  }
}

type ApiValidatorReporter = {
  message: string
  field: string
  rule: string
}

export type transformErrorsResult = Array<{ name: string; errors: string[] }>

export const transformErrors = (
  e: AxiosError | Error | unknown,
  formValues = {}
): transformErrorsResult => {
  if (Object.prototype.hasOwnProperty.call(e, 'response')) {
    const { response } = e as AxiosError
    const errors = response?.data?.errors as Array<ApiValidatorReporter>
    if (!Array.isArray(errors)) return []
    const fields = Object.keys(formValues)
    return errors
      .map(({ field, message }) => {
        if (fields.includes(field)) {
          return { name: field, errors: [message] }
        }
        notification.error({
          message: 'Inválido',
          description: i18n[message] || message
        })
        console.error(e)
      })
      .filter(Boolean) as transformErrorsResult
  }
  return []
}

type FieldName = {
  value?: string
  label?: string
}

type FormatApiResult = {
  data: any
  fieldNames?: { [name: string]: FieldName }
}

export const formatApiResult = ({ data, fieldNames = {} }: FormatApiResult) => {
  Object.keys(data).map(key => {
    const currentValue = data[key]

    if (typeof currentValue === 'string') {
      if (currentValue.split('-').length >= 3) {
        const isDate = moment(currentValue).isValid()
        if (isDate) data[key] = moment(currentValue)
      }
    }

    if (Array.isArray(currentValue)) {
      const { label = 'name', value = 'id' } = fieldNames[key] || {}
      data[key] = currentValue.map(obj => {
        const { [label]: name, [value]: id } = obj
        return {
          ...obj,
          label: name,
          value: id
        }
      })
    }
  })

  return data
}

type FormatJsonToApi = {
  data: any
}

export const formatJsonToApi = ({ data }: FormatJsonToApi) => {
  Object.keys(data).map(key => {
    const currentValue = data[key]

    if (Array.isArray(currentValue)) {
      data[key] = currentValue.map(({ value }) => value)
    }
  })

  return data
}
