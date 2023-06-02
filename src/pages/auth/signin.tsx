import { useContext, useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input, Button, Row, Space, Image, Col } from 'antd'

import AuthLayout from '~/components/Layout/Auth'
import { APP_NAME } from '~/constants'
import { AuthContext } from '~/contexts/AuthContext'
import i18n from '~/i18n'
import ROUTES from '~/routes'
import { SetAuthenticationToken, SignInRequestData } from '~/services/auth'
import { rules, transformErrors } from '~/utils/form'

const PrivacyPolicyModal = dynamic(
  () => import('~/components/Modals/PrivacyPolicyModal'),
  { ssr: false }
)

const SignIn = () => {
  const [userToken, setUserToken] = useState('')
  const [PrivacyPolicyModalVisible, setPrivacyPolicyModalVisible] =
    useState(false)
  const [form] = Form.useForm<SignInRequestData>()
  const { signIn } = useContext(AuthContext)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSignIn(values: SignInRequestData) {
    try {
      if (isSubmitting) return
      setIsSubmitting(true)
      const { token, user } = await signIn(values)
      if (user.acceptedTerms) {
        SetAuthenticationToken(token)
        return Router.push('/dashboard/associates')
      }
      setPrivacyPolicyModalVisible(true)
      setUserToken(token)
    } catch (e) {
      form.setFields(transformErrors(e, form.getFieldsValue()))
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <AuthLayout>
      <PrivacyPolicyModal
        visible={PrivacyPolicyModalVisible}
        userToken={userToken}
        onCancel={() => {
          setPrivacyPolicyModalVisible(false)
        }}
      />
      <Head>
        <title>{APP_NAME} - Login</title>
      </Head>
      <Row
        style={{ minWidth: '100vw', minHeight: '100vh' }}
        align="middle"
        className="flex flex-row"
      >
        <Col
          style={{
            minWidth: '60vw',
            height: '100vh',
            backgroundColor: '#191919'
          }}
          className="flex justify-center"
        >
          <Image alt="logo" src="/image.png" preview={false} className='mt-20'/>
        </Col>
        <Col style={{ minWidth: '40vw', height: '100vh' }} className="flex bg-slate-50	">
          <Row justify="center" align="middle" className="w-full">
            <Row justify="center" align="middle">
              <Form
                form={form}
                initialValues={{ remember: true }}
                onFinish={onSignIn}
                layout="vertical"
                validateTrigger={false}
                size="large"
                className="max-w-[400px] w-[400px] p-6 drop-shadow-md md:min-w-[400px] rounded-md	"
              >
                <Form.Item
                  name="email"
                  rules={[rules.string.required]}
                  label={i18n.email}
                >
                  <Input prefix={<MailOutlined />} allowClear />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[rules.string.required]}
                  label={i18n.password}
                >
                  <Input.Password prefix={<LockOutlined />} />
                </Form.Item>

                <Space size={8} direction="vertical" className="w-full">
                  <Form.Item noStyle shouldUpdate={() => true}>
                    {({ getFieldsValue }) => {
                      const { email, password } = getFieldsValue()
                      return (
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={isSubmitting}
                          disabled={!email || !password}
                        >
                          {i18n.enter}
                        </Button>
                      )
                    }}
                  </Form.Item>
                </Space>
                <Row justify="center" align="middle" className="mt-4">
                  <Link href={ROUTES.auth.forgot}>
                    {i18n.forgotYourPassword}
                  </Link>
                </Row>
              </Form>
            </Row>
          </Row>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignIn
