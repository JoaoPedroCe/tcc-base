import React, { useContext } from 'react'
import { FaScrewdriver } from 'react-icons/fa'

import Link from 'next/link'

import {
  ContainerOutlined,
  LogoutOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  ReadOutlined,
  FileExcelOutlined,
  CalendarOutlined,
  CarOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import classNames from 'classnames'
import createPersistedState from 'use-persisted-state'

import ToggleSidebarButton from '~/components/Buttons/ToggleSidebarButton'
import Div from '~/components/Div'
import Text from '~/components/Typography/Text'
import { AuthContext } from '~/contexts/AuthContext'
import useIsTouchDevice from '~/hooks/useIsTouchDevice'
import i18n from '~/i18n'
import ROUTES from '~/routes'

const { Sider: AntdSider } = Layout

export const useSidebarCollapsedState =
  createPersistedState<boolean>('collapsed')

const items: ItemType[] = [
  {
    key: '/usuarios',
    icon: <UserOutlined />,
    label: <Link href={ROUTES.usuarios.index}>{i18n.users}</Link>
  },
  {
    key: '/clientes',
    icon: <TeamOutlined />,
    label: <Link href={ROUTES.clientes.index}>{i18n.customers}</Link>
  },
  {
    key: '/veiculos',
    icon: <CarOutlined />,
    label: <Link href={ROUTES.veiculos.index}>{i18n.veículo}</Link>
  },
  {
    key: '/orcamentos',
    icon: <ReadOutlined />,
    label: <Link href={ROUTES.orcamentos.index}>{i18n.budget}</Link>
  },
  {
    key: '/agendamentos',
    icon: <CalendarOutlined />,
    label: <Link href={ROUTES.agendamentos.index}>{i18n.schedules}</Link>
  },
  {
    key: '/manutencoes',
    icon: <FaScrewdriver />,
    label: <Link href={ROUTES.manutencoes.index}>{i18n.manutentions}</Link>
  }
]

const Sidebar = () => {
  const { user, singOut } = useContext(AuthContext)
  const [collapsed] = useSidebarCollapsedState()
  const isTouchDevice = useIsTouchDevice()
  const { name } = user
  const menuMode = isTouchDevice ? 'inline' : 'vertical'

  return (
    <AntdSider
      trigger={null}
      width={isTouchDevice ? 270 : 280}
      collapsedWidth={isTouchDevice ? 0 : 64}
      collapsed={collapsed}
      className="app-sidebar z-30"
    >
      <Div className="flex h-full justify-between flex-col">
        <Div>
          <Div
            className={classNames('flex p-5 mb-9', {
              'justify-between': !collapsed,
              'justify-center': collapsed
            })}
          >
            {!isTouchDevice && <ToggleSidebarButton />}
          </Div>

          <Menu mode={menuMode} items={items} />
        </Div>
        <Menu
          mode={menuMode}
          className="w-full bottom-3 flex-menu"
          items={[
            {
              ...(collapsed
                ? {
                    title: ''
                  }
                : {
                    label: (
                      <Text className="ml-2.5 w-[85%] flex overflow-hidden text-overflow-ellipsis">
                        {name}
                      </Text>
                    )
                  }),

              key: 'user',
              children: [
                {
                  label: i18n.exit,
                  key: 'exit',
                  icon: <LogoutOutlined />,
                  onClick: singOut
                }
              ]
            }
          ]}
        />
      </Div>
    </AntdSider>
  )
}

export default Sidebar
