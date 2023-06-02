import { useMutation } from '@tanstack/react-query'

import api from '~/services/api'

export default function useUserAcceptedPrivacyPolicyMutation() {
  return useMutation(() => {
    return api({
      url: 'admin/userAcceptedPrivacyPolicy/',
      method: 'POST'
    })
  })
}
