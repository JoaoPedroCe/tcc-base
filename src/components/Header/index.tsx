import React, { ReactNode, useState } from 'react'

import { Router, useRouter } from 'next/router'

import { Button, Layout } from 'antd'
import { ArrowLeft } from 'tabler-icons-react'

import useIsTouchDevice from '~/hooks/useIsTouchDevice'

import ToggleSidebarButton from '../Buttons/ToggleSidebarButton'
import Div from '../Div'
import Text from '../Typography/Text'

export type HeaderProps = {
  title?: string | ReactNode
  back?: boolean
  extra?: ReactNode
}

const Header = ({ back, title = process.env.APP_NAME, extra }: HeaderProps) => {
  const { pathname } = useRouter()
  const [prevPathname, setPrevPathname] = useState('')
  const isTouchDevice = useIsTouchDevice()
  const { back: goBack, push } = useRouter()

  function onBack() {
    if (!prevPathname) return push('/')
    goBack()
  }

  Router.events.on('routeChangeComplete', () => {
    setPrevPathname(pathname)
  })

  return (
    <Layout.Header className="flex h-20 px-8">
      {((back === undefined && pathname !== '/dashboard') || back) && (
        <Div className="flex items-center h-full">
          <Button type="text" icon={<ArrowLeft size={22} />} onClick={onBack} />
        </Div>
      )}
      <Div className="flex items-center h-full">
        <Text className="text-xl">{title}</Text>
      </Div>
      {extra && extra}
      {isTouchDevice && (
        <Div className="flex items-center h-full ml-auto">
          <ToggleSidebarButton />
        </Div>
      )}
    </Layout.Header>
  )
}

export default Header
