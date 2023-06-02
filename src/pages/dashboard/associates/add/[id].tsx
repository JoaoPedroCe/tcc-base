import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { SaveOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Spin
} from 'antd'
import { MaskedInput } from 'antd-mask-input'
import locale from 'antd/lib/date-picker/locale/pt_BR'
import { Rule } from 'antd/lib/form'
import dayjs from 'dayjs'
import { debounce } from 'lodash'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DatePicker from '~/components/Inputs/DatePicker'
import DefaultLayout from '~/components/Layout/Default'
import GenreSelect from '~/components/Selects/GenreSelect'
import StateSelect from '~/components/Selects/StateSelect'
import { DATE_FORMAT } from '~/constants'
import useAssociate, { Associate } from '~/hooks/useAssociate'
import useAssociateMutation from '~/hooks/useAssociateMutation'
import useRouterParams from '~/hooks/useRouterParams'
import { getViaCep } from '~/hooks/useViaCep'
import i18n from '~/i18n'
import { formatJsonToApi, rules, transformErrors } from '~/utils/form'
import { cellphoneMask, cepMask, cpfMask, phoneMask } from '~/utils/masks'

const ASSOCIATE_FORM_RULES = {
  name: [rules.string.required, { max: 200 }] as Array<Rule>,
  company: [{ max: 300 }] as Array<Rule>,
  cpf: [rules.string.required, { len: 14 }] as Array<Rule>,
  genre: [{ required: false }] as Array<Rule>,
  email: [rules.string.required, { type: 'email', max: 256 }] as Array<Rule>,
  zipCode: [{ len: 9 }],
  address: [{ max: 200 }] as Array<Rule>,
  addressNumber: [
    { type: 'number', max: 99999, required: false }
  ] as Array<Rule>,
  complement: [{ max: 200, required: false }] as Array<Rule>,
  city: [{ max: 200 }] as Array<Rule>,
  phone: [{ max: 14 }] as Array<Rule>,
  cellphone: [rules.string.required, { max: 15 }] as Array<Rule>,
  stateId: [{ required: false }] as Array<Rule>,
  birthDate: [{ required: false }]
}

const AddOrUpdateAssociate: React.FC = () => {
  const { back } = useRouter()
  const { id } = useRouterParams()
  const { data: associate, isFetching } = useAssociate(id)
  const [title, setTitle] = useState('')
  const [form] = Form.useForm<Associate>()
  const { setFieldsValue, setFields, getFieldsValue, submit } = form
  const getCepDataWithDebounce = useRef(
    debounce(async (cep: string) => {
      try {
        const {
          logradouro = '',
          bairro = '',
          uf,
          complemento,
          localidade
        } = await getViaCep(cep)
        setFieldsValue({
          ...getFieldsValue,
          zipCode: cep,
          address: `${logradouro} ${bairro}`,
          city: localidade,
          complement: complemento,
          stateAbbreviation: uf,
          stateId: 43,
          countryId: 76
        })
      } catch (ex) {
        notification.error({
          message: i18n.error,
          description: i18n.errorSearchingZipCodeData
        })
      }
    }, 900)
  ).current

  const { mutateAsync: storeOrUpdateAssociateMutate, isLoading } =
    useAssociateMutation()

  async function storeOrUpdateAssociate(values: Associate) {
    try {
      if (isLoading) return
      const { birthDate } = values
      await storeOrUpdateAssociateMutate(
        formatJsonToApi({
          data: {
            ...associate,
            ...values,
            birthDate: dayjs(birthDate).isValid()
              ? dayjs(birthDate).format(DATE_FORMAT)
              : null
          }
        })
      )
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.customer)
      })
      back()
    } catch (e) {
      setFields(transformErrors(e, getFieldsValue()))
    }
  }

  useEffect(() => {
    if (!associate) return
    const { birthDate, ...data } = associate
    form.setFieldsValue({
      birthDate: dayjs(birthDate).isValid() ? dayjs(birthDate) : undefined,
      ...data
    })
    return () => {
      form.resetFields()
    }
  }, [form, associate])

  useEffect(() => {
    setTitle(`${i18n[id ? 'edit' : 'add']} ${i18n.customer}`)
  }, [id])

  return (
    <DefaultLayout title={title}>
      <LayoutContentCard
        actions={[
          <Div key="actions" className="flex justify-end px-4">
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
            onFinish={storeOrUpdateAssociate}
            validateTrigger={false}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.name}
                  name="name"
                  rules={ASSOCIATE_FORM_RULES.name}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.cpf}
                  name="cpf"
                  rules={ASSOCIATE_FORM_RULES.cpf}
                >
                  <MaskedInput mask={cpfMask} maskOptions={{ lazy: true }} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  initialValue={dayjs()}
                  label={i18n.birthDate}
                  name="birthDate"
                  rules={ASSOCIATE_FORM_RULES.birthDate}
                >
                  <DatePicker
                    picker="date"
                    format="DD/MM/YYYY"
                    placeholder=""
                    defaultValue={undefined}
                    locale={locale}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.genre}
                  name="genre"
                  rules={ASSOCIATE_FORM_RULES.genre}
                >
                  <GenreSelect />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.email}
                  name="email"
                  rules={ASSOCIATE_FORM_RULES.email}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.zipCode}
                  name="zipCode"
                  rules={ASSOCIATE_FORM_RULES.zipCode}
                >
                  <MaskedInput
                    mask={cepMask}
                    maskOptions={{ lazy: true }}
                    onChange={({ target }) => {
                      getCepDataWithDebounce(target.value)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.address}
                  name="address"
                  rules={ASSOCIATE_FORM_RULES.address}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.addressNumber}
                  name="addressNumber"
                  rules={ASSOCIATE_FORM_RULES.addressNumber}
                >
                  <InputNumber maxLength={5} max={99999} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.complement}
                  name="complement"
                  rules={ASSOCIATE_FORM_RULES.complement}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.city}
                  name="city"
                  rules={ASSOCIATE_FORM_RULES.city}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.state}
                  name="stateId"
                  rules={ASSOCIATE_FORM_RULES.stateId}
                >
                  <StateSelect initialFilters={{ perPage: 30 }} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.phone}
                  name="phone"
                  rules={ASSOCIATE_FORM_RULES.phone}
                >
                  <MaskedInput mask={phoneMask} maskOptions={{ lazy: true }} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.cellphone}
                  name="cellphone"
                  rules={ASSOCIATE_FORM_RULES.cellphone}
                >
                  <MaskedInput
                    mask={cellphoneMask}
                    maskOptions={{ lazy: true }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default AddOrUpdateAssociate
