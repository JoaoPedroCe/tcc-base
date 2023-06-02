
import { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, Row, Space, notification } from 'antd'

import AuthLayout from '~/components/Layout/Auth'
import { APP_NAME } from '~/constants'
import i18n from '~/i18n'
import ROUTES from '~/routes'
import { signUpRequest, SignUpRequestData } from '~/services/auth'
import { rules, transformErrors } from '~/utils/form'


const SignUp: React.FC = () => {
  const router = useRouter()
  const [form] = Form.useForm<SignUpRequestData>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSignUp(values: SignUpRequestData) {
    try {
      if (isSubmitting) return
      setIsSubmitting(true)
      const message = await signUpRequest(values)
      notification.success({ message })
      router.push(ROUTES.auth.signin)
    } catch (e) {
      form.setFields(transformErrors(e, form.getFieldsValue()))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <Head>
        <title>{APP_NAME} - Login</title>
      </Head>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onSignUp}
          layout="vertical"
          validateTrigger={false}
          size="large"
          className="min-w-[400px] max-w-[400px] p-6 shadow-card"
        >
          <Form.Item name="name" label="Nome" rules={[rules.string.required]}>
            <Input prefix={<UserOutlined />} allowClear />
          </Form.Item>

          <Form.Item
            name="email"
            label="Endereço de Email"
            rules={[rules.string.required]}
          >
            <Input type="email" prefix={<MailOutlined />} allowClear />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            hasFeedback
            rules={[rules.string.required]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            label="Confirme a Senha"
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
                      'As duas senhas que você digitou não correspondem!'
                    )
                  )
                }
              })
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Space size={8} direction="vertical" className="w-full">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
            >
              {i18n.createAccount}
            </Button>
            <Row justify="center" align="middle">
              <Space size={4}>
                {i18n.alreadyHaveAnAccount}{' '}
                <Link href={ROUTES.auth.signin}>{i18n.enter}</Link>
              </Space>
            </Row>
          </Space>
        </Form>
      </Row>
    </AuthLayout>
  )
}

export default SignUp
