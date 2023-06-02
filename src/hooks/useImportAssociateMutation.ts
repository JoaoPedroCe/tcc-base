import { useMutation } from '@tanstack/react-query'

import api from '~/services/api'

import { ImportAssociate } from './useImportAssociate'

export default function useImportAssociateMutation() {
  return useMutation((values: ImportAssociate) => {
    return api({
      url: 'admin/importAssociates/',
      method: 'POST',
      data: values
    })
  })
}
