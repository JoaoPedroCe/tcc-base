import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import {
  CloseOutlined,
  FieldTimeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined
} from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Space,
  Spin,
  Upload,
  UploadFile
} from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { Rule } from 'antd/lib/form'
import { UploadChangeParam } from 'antd/lib/upload'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import CitySelect from '~/components/Selects/CitySelect'
import CustomerSelect from '~/components/Selects/CustomersSelect'
import PublicationTypeSelect from '~/components/Selects/PublicationType'
import StateSelect from '~/components/Selects/StateSelect'
import { PUBLICATION_FILE_URL } from '~/constants'
import usePublication, { Publication } from '~/hooks/usePublication'
import usePublicationMutation from '~/hooks/usePublicationMutation'
import useRouterParams from '~/hooks/useRouterParams'
import { State } from '~/hooks/useState'
import i18n from '~/i18n'
import api from '~/services/api'
import { sendWhatsApp } from '~/services/sendWhastapp'
import { rules, transformErrors } from '~/utils/form'

const PUBLICATION_FORM_RULES = {
  title: [rules.string.required, { max: 100 }] as Array<Rule>,
  type: [{ required: true }],
  description: [rules.string.required, { max: 3000 }] as Array<Rule>
}

export type ResponseResult = {
  response?: {
    fileName?: string
  }
}

const AddOrUpdatePublication: React.FC = () => {
  const [statefieldsVisible, setStateFieldsVisible] = useState()
  const [value, setValue] = useState<number>()
  const [selectedState, setSelectedState] = useState<State>({} as State)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [published, setPublished] = useState<string>()
  const { TextArea } = Input
  const { back } = useRouter()
  const { id } = useRouterParams()
  const [title, setTitle] = useState('')
  const { data: publication, isFetching } = usePublication(id)
  const [form] = Form.useForm<Publication>()
  const { getFieldsValue, submit, setFieldValue, setFields } = form
  const { mutateAsync: storeOrUpdatePublicationMutate, isLoading } =
    usePublicationMutation()

  async function storeOrUpdatePublication(values: Publication) {
    try {
      if (isLoading) return
      await storeOrUpdatePublicationMutate({
        ...publication,
        ...values,
        isPublished: published || ''
      })
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.budget)
      })
      back()
    } catch (e) {
      setFields(transformErrors(e, getFieldsValue()))
    }
  }

  function onChangeFile({ file, fileList }: UploadChangeParam) {
    const { response }: ResponseResult = file
    setFileList(fileList)
    if (file.status === 'done') {
      setFieldValue('mediaFileUrl', response?.fileName)
    }
    if (file.status === 'removed') {
      setFieldValue('mediaFileUrl', ' ')
      setFileList(fileList)
    }
  }

  function handleFormChange() {
    setStateFieldsVisible(form.getFieldValue('type'))
  }

  useEffect(() => {
    form.setFieldsValue(publication as Publication)
    setStateFieldsVisible(form.getFieldValue('type'))
  }, [form, publication])

  useEffect(() => {
    setTitle(`${i18n[id ? 'edit' : 'add']} ${i18n.budget}`)
  }, [id])

  useEffect(() => {
    if (id) {
      setFileList([
        {
          uid: publication?.id?.toString() || '',
          name: publication?.mediaFileUrl?.toString() || ''
        }
      ])
      setFieldValue('mediaFileUrl', publication?.mediaFileUrl)
    }
  }, [publication, id])

  return (
    <DefaultLayout title={title}>
      <LayoutContentCard
        actions={[
          <Div key="actions" className="flex justify-end px-4 gap-1">
            {publication?.isPublished != 'Aprovado' &&
              publication?.isPublished != 'Recusado' && (
                <Button
                  type="primary"
                  size="large"
                  icon={<CloseOutlined />}
                  loading={isFetching || isLoading}
                  onClick={() => {
                    setPublished('Recusado')
                    submit()
                  }}
                >
                  Recusado
                </Button>
              )}
            {publication?.isPublished != 'Aprovado' &&
              publication?.isPublished != 'Recusado' && (
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: '#f4a261' }}
                  icon={<FieldTimeOutlined />}
                  loading={isFetching || isLoading}
                  onClick={submit}
                >
                  {i18n.awaitResponse}
                </Button>
              )}
            {publication?.isPublished != 'Recusado' &&
              publication?.isPublished != 'Aprovado' && (
                <Button
                  type="primary"
                  size="large"
                  icon={<SaveOutlined />}
                  style={{ backgroundColor: '#57A773' }}
                  loading={isFetching || isLoading}
                  onClick={() => {
                    setPublished('Aprovado')
                    submit()
                  }}
                >
                  {i18n.aproved}
                </Button>
              )}
          </Div>
        ]}
      >
        <Spin spinning={isFetching || isFetching}>
          <Form
            form={form}
            onFinish={storeOrUpdatePublication}
            validateTrigger={false}
            layout="vertical"
            onValuesChange={handleFormChange}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} span={6}>
                <Form.Item
                  name="associateId"
                  label={i18n.customer}
                  rules={PUBLICATION_FORM_RULES.type}
                >
                  <CustomerSelect
                    onChange={value => setValue(value)}
                    value={value}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} span={6}>
                <Form.Item
                  name="title"
                  label="Veículo"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {statefieldsVisible === 'Benefícios' && (
              <Row gutter={[16, 16]}>
                <Col xs={12} span={6}>
                  <Form.Item
                    name="stateId"
                    label={i18n.state}
                    rules={PUBLICATION_FORM_RULES.type}
                  >
                    <StateSelect
                      style={{ width: '100%' }}
                      initialFilters={{ sortColumn: 'name', perPage: 30 }}
                      onChange={(_, state) => {
                        setSelectedState(state as unknown as State)
                        form.setFieldValue('city', null)
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} span={6}>
                  <Form.Item
                    name="city"
                    label={i18n.city}
                    rules={PUBLICATION_FORM_RULES.type}
                  >
                    <CitySelect UF={selectedState} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            )}
            <Row gutter={[16, 16]} className="mt-2">
              <Col xs={24} span={6}>
                <Form.List
                  name="links"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (names?.length >= 9) {
                          return Promise.reject(
                            new Error(
                              'Máximo de links que podem ser cadastrados são 8'
                            )
                          )
                        }
                      }
                    }
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item {...restField} name={[name, 'name']}>
                            <Input placeholder="Nome do serviço" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'linkUrl']}>
                            <Input placeholder="Valor" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          {i18n.addService}
                        </Button>
                      </Form.Item>
                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} span={6}>
                <Form.Item
                  name="description"
                  label={i18n.description}
                  rules={PUBLICATION_FORM_RULES.description}
                >
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default AddOrUpdatePublication
