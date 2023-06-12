import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import Router from 'next/router'

import { Modal, ModalProps } from 'antd'

import { PRIVACY_POLICY_FILE_GET_URL } from '~/constants'
import { AuthUser, useUserState } from '~/contexts/AuthContext'
import useUserAcceptedPrivacyPolicyMutation from '~/hooks/useUsersAcceptedPrivacyPoliciesMutation'
import i18n from '~/i18n'
import { SetAuthenticationToken } from '~/services/auth'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

type PrivacyPolicyModalProps = {
  userToken: string
} & ModalProps

const PrivacyPolicyModal = ({
  userToken,
  ...props
}: PrivacyPolicyModalProps) => {
  const [numPages, setNumPages] = useState<number>()
  const [user, setUser] = useUserState({} as AuthUser)
  const { mutateAsync: storeUserAcceptedPrivacyPolicyMutate } =
    useUserAcceptedPrivacyPolicyMutation()

  async function storeOrUpdateUserAcceptedPrivacyPolicy() {
    SetAuthenticationToken(userToken)
    setUser({ ...user, acceptedTerms: true })
    await storeUserAcceptedPrivacyPolicyMutate()
    Router.push('/dashboard')
  }

  return (
    <Modal
      title={i18n.privacyPolicy}
      onOk={storeOrUpdateUserAcceptedPrivacyPolicy}
      closable={false}
      okText={i18n.accept}
      cancelText={i18n.reject}
      centered
      bodyStyle={{
        overflowY: 'scroll',
        height: '80vh'
      }}
      width="auto"
      {...props}
    >
      <Document
        file={PRIVACY_POLICY_FILE_GET_URL}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(Array(numPages).keys()).map(page => (
          <Page key={`page_${page + 1}`} pageNumber={page + 1} />
        ))}
      </Document>
    </Modal>
  )
}

export default PrivacyPolicyModal
