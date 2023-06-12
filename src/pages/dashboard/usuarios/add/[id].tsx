import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, notification, Row, Spin } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { Rule } from 'antd/lib/form'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import useRouterParams from '~/hooks/useRouterParams'
import useUser, { User } from '~/hooks/useUser'
import useUserMutation from '~/hooks/useUserMutation'
import i18n from '~/i18n'
import { formatJsonToApi, rules, transformErrors } from '~/utils/form'
import { cpfMask } from '~/utils/masks'

export const USER_FORM_RULES = {
  name: [rules.string.required, { max: 200 }] as Array<Rule>,
  cpf: [rules.string.required, { len: 14 }] as Array<Rule>,
  email: [rules.string.required, { type: 'email', max: 256 }] as Array<Rule>,
  username: [rules.string.required, { max: 25 }] as Array<Rule>
}

const AddOrUpdateUser: React.FC = () => {
  const { back } = useRouter()
  const { id } = useRouterParams()
  const { data: user, isFetching } = useUser(id)
  const [title, setTitle] = useState('')
  const [form] = Form.useForm<User>()
  const { setFields, getFieldsValue, submit } = form
  const { mutateAsync: storeOrUpdateUserMutate, isLoading } = useUserMutation()

  async function storeOrUpdateUser(values: User) {
    try {
      if (isLoading) return
      await storeOrUpdateUserMutate(
        formatJsonToApi({ data: { ...user, ...values } })
      )
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.user)
      })
      back()
    } catch (e) {
      setFields(transformErrors(e, getFieldsValue()))
    }
  }
  useEffect(() => {
    form.setFieldsValue(user as User)
    return () => {
      form.resetFields()
    }
  }, [form, user])

  useEffect(() => {
    setTitle(`${i18n[id ? 'edit' : 'add']} ${i18n.user}`)
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
            initialValues={user}
            onFinish={storeOrUpdateUser}
            validateTrigger={false}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.name}
                  name="name"
                  rules={USER_FORM_RULES.name}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.cpf}
                  name="cpf"
                  rules={USER_FORM_RULES.cpf}
                >
                  <MaskedInput mask={cpfMask} maskOptions={{ lazy: true }} />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.email}
                  name="email"
                  rules={USER_FORM_RULES.email}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.login}
                  name="username"
                  rules={USER_FORM_RULES.username}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.password}
                  name="password"
                  rules={[
                    {
                      required: id ? false : true,
                      min: 8,
                      max: 20
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && !getFieldValue('passwordConfirmation')) {
                          return Promise.reject(
                            new Error('Preencha o campo de confirmar senha')
                          )
                        }
                        return Promise.resolve()
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={12} span={6}>
                <Form.Item
                  label={i18n.passwordConfirmation}
                  name="passwordConfirmation"
                  rules={[
                    {
                      min: 8,
                      max: 20,
                      required: id ? false : true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            'As senhas que você digitou não correspondem!'
                          )
                        )
                      }
                    })
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default AddOrUpdateUser
