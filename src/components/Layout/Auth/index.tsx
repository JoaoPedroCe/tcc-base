import React from 'react'

import { Layout } from 'antd'

type AuthLayoutProps = {
  children: React.ReactElement | Array<React.ReactElement>
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Layout>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}

export default AuthLayout
