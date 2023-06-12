import { useState } from 'react'

import { useRouter } from 'next/router'

import { SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Spin,
  UploadFile
} from 'antd'
import { Rule } from 'antd/lib/form'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import CustomerSelect from '~/components/Selects/CustomersSelect'
import CategoryType from '~/components/Selects/IsFromTheCategorySelect'
import BrandSelect from '~/components/Selects/IsVolunteerPartnerSelect'
import { Publication } from '~/hooks/usePublication'
import useRouterParams from '~/hooks/useRouterParams'
import { State } from '~/hooks/useState'
import useVehicle from '~/hooks/useVehicle'
import useVehicleMutation from '~/hooks/useVehicleMutation'
import i18n from '~/i18n'
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
  const [value, setValue] = useState<number>()
  const [_, setPublished] = useState<string>()
  const { TextArea } = Input
  const { back } = useRouter()
  const { id } = useRouterParams()
  const [title] = useState('')
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

  return (
    <DefaultLayout title='Adicionar Agendamento'>
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
