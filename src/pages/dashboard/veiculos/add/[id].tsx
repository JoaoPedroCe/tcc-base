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
import CategoryType from '~/components/Selects/IsFromTheCategorySelect'
import BrandSelect from '~/components/Selects/IsVolunteerPartnerSelect'
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
import useVehicleMutation from '~/hooks/useVehicleMutation'
import useVehicle from '~/hooks/useVehicle'

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
  const { data: publication, isFetching } = useVehicle(id)
  const [form] = Form.useForm<Publication>()
  const { getFieldsValue, submit, setFieldValue, setFields } = form
  const { mutateAsync: storeOrUpdatePublicationMutate, isLoading } =
    useVehicleMutation()

  async function storeOrUpdatePublication(values) {
    try {
      if (isLoading) return
      await storeOrUpdatePublicationMutate({
        ...publication,
        ...values
      })
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.veículo)
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
    setTitle(`${i18n[id ? 'edit' : 'add']} ${i18n.veículo}`)
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
              {i18n.save}
            </Button>
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
              <Col xs={12} span={6}>
                <Form.Item
                  name="model"
                  label="Modelo"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  name="year"
                  label="Ano"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <Input inputMode="numeric" maxLength={4} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  name="brand"
                  label="Marca"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <BrandSelect />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  name="plate"
                  label="Placa"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  name="category"
                  label="Categoria"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <CategoryType />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  name="document"
                  label="Documento"
                  rules={PUBLICATION_FORM_RULES.title}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
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
                  name="annotations"
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
