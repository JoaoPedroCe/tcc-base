import { useState } from 'react'

import Router from 'next/router'

import { SaveOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, notification, Upload, UploadFile } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import { IMPORT_ASSOCIATE_FILE_UPLOAD_URL } from '~/constants'
import { ImportAssociate } from '~/hooks/useImportAssociate'
import useImportAssociateMutation from '~/hooks/useImportAssociateMutation'
import i18n from '~/i18n'
import api from '~/services/api'
import { formatJsonToApi } from '~/utils/form'
import { responseImportErrors } from '~/utils/responseImportErrors'

import { ResponseResult } from '../collectiveAgreements/add/[id]'

const ImportAssociates = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [disableSaveButton, setDisableSaveButton] = useState(true)
  const [form] = Form.useForm<ImportAssociate>()
  const { submit, setFieldValue } = form
  const { mutateAsync: storeOrUpdateImportAssociateMutate, isLoading } =
    useImportAssociateMutation()

  async function storeOrUpdateImportAssociates(values: ImportAssociate) {
    try {
      if (isLoading) return
      await storeOrUpdateImportAssociateMutate(
        formatJsonToApi({ data: { ...values } })
      )
      notification.success({
        message: i18n.success,
        description: i18n.importationSucess
      })
      return Router.push('associates')
    } catch (e) {
      responseImportErrors(e)
    }
  }

  function onChangeFile({ file, fileList }: UploadChangeParam) {
    const { response }: ResponseResult = file
    setFileList(fileList)
    if (file.status === 'done') {
      setFieldValue('fileName', response?.fileName)
      setDisableSaveButton(false)
    }
  }

  return (
    <DefaultLayout title='Agendamentos'>
      <LayoutContentCard
        actions={[
          <Div key="actions" className="flex justify-end px-4">
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              loading={isLoading}
              onClick={submit}
              disabled={disableSaveButton}
            >
              {i18n.save}
            </Button>
          </Div>
        ]}
      >
        <Form
          form={form}
          onFinish={storeOrUpdateImportAssociates}
          validateTrigger={false}
          layout="vertical"
        >
          <Form.Item name="fileName">
            <Upload
              headers={{ Authorization: api.defaults.headers['Authorization'] }}
              accept=".xlsx"
              maxCount={1}
              action={IMPORT_ASSOCIATE_FILE_UPLOAD_URL}
              method="POST"
              fileList={fileList}
              onChange={onChangeFile}
              onRemove={() => {
                setDisableSaveButton(true)
              }}
            >
              <Button icon={<UploadOutlined />}>{i18n.sendFile}</Button>
            </Upload>
          </Form.Item>
        </Form>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default ImportAssociates
