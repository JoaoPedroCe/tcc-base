import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import Head from 'next/head'

import { ConfigProvider, Layout } from 'antd'
import classNames from 'classnames'

import Div from '~/components/Div'
import Header, { HeaderProps } from '~/components/Header'
import { validateMessages } from '~/constants/validateMessages'
import { AuthContext } from '~/contexts/AuthContext'
import useIsTouchDevice from '~/hooks/useIsTouchDevice'

import Sidebar, { useSidebarCollapsedState } from './Sidebar'

type DefaultLayoutProps = {
  title?: string | ReactNode
  headerProps?: HeaderProps
  children: React.ReactElement | Array<React.ReactElement>
}

type LayoutProviderType = {
  modalFiltersVisible: boolean
  setModalFiltersVisible: React.Dispatch<React.SetStateAction<boolean>>
} & Pick<DefaultLayoutProps, 'title'>

export const LayoutContext = createContext({} as LayoutProviderType)

const DefaultLayout = ({
  title = process.env.APP_NAME,
  headerProps,
  children
}: DefaultLayoutProps) => {
  const { isAuthenticated } = useContext(AuthContext)
  const [collapsed] = useSidebarCollapsedState()
  const [paddingLeft, setPaddingLeft] = useState(0)
  const isTouchDevice = useIsTouchDevice()
  const [modalFiltersVisible, setModalFiltersVisible] = useState(false)

  useEffect(() => {
    if (isTouchDevice) return setPaddingLeft(0)
    if (isAuthenticated) setPaddingLeft(collapsed ? 64 : 280)
  }, [isAuthenticated, collapsed, isTouchDevice])

  return (
    <Layout className="h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <LayoutContext.Provider
        value={{ title, modalFiltersVisible, setModalFiltersVisible }}
      >
        <ConfigProvider form={{ validateMessages: validateMessages }}>
          {isAuthenticated && <Sidebar />}
          <Div
            className="ant-layout"
            style={{ paddingLeft, transition: 'all 0.2s' }}
          >
            <Header title={title} {...headerProps} />
            <Layout.Content
              className={classNames({
                'p-4': isTouchDevice,
                'p-8': !isTouchDevice
              })}
            >
              {children}
            </Layout.Content>
          </Div>
        </ConfigProvider>
      </LayoutContext.Provider>
    </Layout>
  )
}

export default DefaultLayout
