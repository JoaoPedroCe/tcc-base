import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { LoginOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Row, Space, message, Image, Col } from 'antd'

import AuthLayout from '~/components/Layout/Auth'
import i18n from '~/i18n'
import ROUTES from '~/routes'
import api from '~/services/api'
import type { SignInRequestData } from '~/services/auth'
import { transformErrors } from '~/utils/form'

const Forgot = () => {
  const router = useRouter()
  const [form] = Form.useForm<SignInRequestData>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onForgot(values: SignInRequestData) {
    try {
      if (isSubmitting) return
      setIsSubmitting(true)
      await api.post('/auth/forgot', values)
      message.success(i18n.recoveryEmailSentSuccessfully, 3)
      router.push(ROUTES.auth.signin)
    } catch (e) {
      form.setFields(transformErrors(e, form.getFieldsValue()))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
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
            <Row justify="center" align="middle">
              <Form
                form={form}
                initialValues={{ remember: true }}
                onFinish={onForgot}
                layout="vertical"
                validateTrigger={false}
                size="large"
                className="min-w-[400px] max-w-[400px] p-6 shadow-card"
              >
                <Form.Item name="email" hasFeedback>
                  <Input
                    prefix={<MailOutlined />}
                    placeholder={i18n.email}
                    allowClear
                  />
                </Form.Item>

                <Space size={8} direction="vertical" className="w-full">
                  <Form.Item noStyle shouldUpdate={() => true}>
                    {({ getFieldsValue }) => {
                      const { email } = getFieldsValue()
                      return (
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={isSubmitting}
                          disabled={!email}
                        >
                          {i18n.send}
                        </Button>
                      )
                    }}
                  </Form.Item>

                  <Link href={ROUTES.auth.signin} passHref>
                    <Button
                      size="small"
                      type="link"
                      block
                      icon={<LoginOutlined />}
                    >
                      {i18n.enter}
                    </Button>
                  </Link>
                </Space>
              </Form>
            </Row>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default Forgot
