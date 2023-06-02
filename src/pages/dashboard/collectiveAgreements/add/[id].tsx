import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { CloseOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
  Upload,
  UploadFile
} from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import { COLLECTIVE_AGREEMENTS_FILE_URL } from '~/constants'
import useCollectiveAgreement, {
  CollectiveAgreement
} from '~/hooks/useCollectiveAgreement'
import useCollectiveAgreementMutation from '~/hooks/useCollectiveAgreementMutation'
import useRouterParams from '~/hooks/useRouterParams'
import i18n from '~/i18n'
import api from '~/services/api'
import { formatJsonToApi, transformErrors } from '~/utils/form'

export type ResponseResult = {
  response?: {
    fileName?: string
  }
}

const AddOrUpdateCollectiveAgreement = () => {
  const { back } = useRouter()
  const { id } = useRouterParams()
  const { data: collectiveAgreement, isFetching } = useCollectiveAgreement(id)
  const [title, setTitle] = useState('')
  const [form] = Form.useForm<CollectiveAgreement>()
  const { setFields, getFieldsValue, submit, setFieldValue } = form
  const { mutateAsync: storeOrUpdateCollectiveAgreementMutate, isLoading } =
    useCollectiveAgreementMutation()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  async function storeOrUpdateCollectiveAgreement(values: CollectiveAgreement) {
    try {
      if (isLoading) return

      await storeOrUpdateCollectiveAgreementMutate(
        formatJsonToApi({ data: { ...collectiveAgreement, ...values } })
      )
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.company)
      })
      back()
    } catch (e) {
      setFields(transformErrors(e, getFieldsValue()))
    }
  }

  function onChangeFile({ file }: UploadChangeParam) {
    const { response }: ResponseResult = file
    setFileList([file])
    if (file.status === 'done') {
      setFieldValue('fileName', response?.fileName)
    }
  }

  useEffect(() => {
    form.setFieldsValue(collectiveAgreement as CollectiveAgreement)
  }, [form, collectiveAgreement])

  useEffect(() => {
    setTitle(`${i18n[id ? 'edit' : 'add']} ${i18n.collectiveAgreements}`)
  }, [id])

  useEffect(() => {
    if (id) {
      setFileList([
        {
          uid: collectiveAgreement?.id.toString() || '',
          name: collectiveAgreement?.collectiveAgreementName.toString() || ''
        }
      ])
    }
  }, [collectiveAgreement, id])

  return (
    <DefaultLayout title={title}>
      <LayoutContentCard
        actions={[
          <Div key="actions" className="flex justify-end px-4">
            <Button
              type="dashed"
              size="large"
              icon={<CloseOutlined />}
              loading={isFetching || isLoading}
              onClick={back}
            >
              {i18n.cancel}
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              loading={isFetching || isLoading}
              onClick={submit}
            >
              {i18n.save}
            </Button>
          </Div>
        ]}
      >
        <Spin spinning={isFetching || isLoading}>
          <Form
            form={form}
            initialValues={collectiveAgreement}
            onFinish={storeOrUpdateCollectiveAgreement}
            validateTrigger={false}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item label={i18n.companyName} name="companyName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.collectiveAgreementsName}
                  name="collectiveAgreementName"
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="fileName" required>
              <Upload
                headers={{
                  Authorization: api.defaults.headers['Authorization']
                }}
                name="file"
                action={
                  id
                    ? COLLECTIVE_AGREEMENTS_FILE_URL.concat(`/${id}`)
                    : COLLECTIVE_AGREEMENTS_FILE_URL
                }
                method={id ? 'PUT' : 'POST'}
                accept=".pdf"
                maxCount={1}
                fileList={fileList}
                onChange={onChangeFile}
                showUploadList={{ showRemoveIcon: false }}
              >
                <Button icon={<UploadOutlined />}>{i18n.send}</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default AddOrUpdateCollectiveAgreement
