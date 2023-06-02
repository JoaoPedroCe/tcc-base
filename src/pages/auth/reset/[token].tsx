import { useState } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, Row, Space, message, Col, Image } from 'antd'

import AuthLayout from '~/components/Layout/Auth'
import { APP_NAME } from '~/constants'
import i18n from '~/i18n'
import ROUTES from '~/routes'
import api from '~/services/api'
import { rules, transformErrors } from '~/utils/form'

type ResetRouterParams = {
  token: string
}

type ResetData = {
  password: string
  password_confirmation: string
}

const Reset = () => {
  const router = useRouter()
  const { token } = router.query as ResetRouterParams
  const [form] = Form.useForm<ResetData>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onForgot(values: ResetData) {
    try {
      if (isSubmitting) return
      setIsSubmitting(true)
      await api.post('/auth/reset', { token, ...values })
      router.push(ROUTES.auth.signin)
      message.success(i18n.passwordChangedSuccessfully)
    } catch (e) {
      form.setFields(transformErrors(e, form.getFieldsValue()))
      form.resetFields()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>
          {APP_NAME} - {i18n.forgotYourPassword}
        </title>
      </Head>
      <Row style={{ minWidth: '100vw', minHeight: '100vh' }} align="middle">
        <Col
          style={{
            minWidth: '60vw',
            height: '100vh',
            backgroundColor: '#191919'
          }}
          className="flex justify-center"
        >
          <Image
            alt="logo"
            src="/image.png"
            preview={false}
            className="mt-20"
          />
        </Col>
        <Col
          style={{ minWidth: '40vw', height: '100vh' }}
          className="flex bg-slate-50	"
        >
          <Row justify="center" align="middle" className="w-full">
            <Form
              form={form}
              initialValues={{ remember: true }}
              onFinish={onForgot}
              layout="vertical"
              validateTrigger={false}
              size="large"
              className="min-w-[400px] max-w-[400px] p-6 drop-shadow-md md:min-w-[400px] rounded-md"
            >
              <Form.Item
                name="password"
                label={i18n.newPassword}
                hasFeedback
                rules={[rules.string.required]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name="password_confirmation"
                label={i18n.passwordConfirmation}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Por favor, confirme sua senha!'
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
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>

              <Space size={8} direction="vertical" className="w-full">
                <Form.Item noStyle shouldUpdate={() => true}>
                  {({ getFieldsValue }) => {
                    const { password, password_confirmation } = getFieldsValue()
                    return (
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={isSubmitting}
                        disabled={!password || !password_confirmation}
                      >
                        {i18n.changePassword}
                      </Button>
                    )
                  }}
                </Form.Item>
              </Space>
            </Form>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default Reset
