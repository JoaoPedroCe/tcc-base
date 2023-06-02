
import React from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Button, Space } from 'antd'

import i18n from '~/i18n'

const LoginOutlined = dynamic(import('@ant-design/icons/LoginOutlined'), {
  ssr: false
})

const AuthLayoutHeaderExtra = () => {
  return (
    <Space align="end" className="ml-auto items-center">
      <Link href="/auth/signin">
        <Button type="link" icon={<LoginOutlined />}>
          {i18n.enter}
        </Button>
      </Link>
    </Space>
  )
}
export default AuthLayoutHeaderExtra
