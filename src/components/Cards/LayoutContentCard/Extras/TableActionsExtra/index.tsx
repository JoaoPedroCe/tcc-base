import React, { useContext } from 'react'
import { ViewProps } from 'react-device-detect'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  FilterOutlined,
  UnorderedListOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { Button, Dropdown, Menu, Space, Tooltip } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'

import Div from '~/components/Div'
import { LayoutContext } from '~/components/Layout/Default'
import i18n from '~/i18n'
import { useTableSettings } from '~/pages/dashboard/settings'

const PlusOutlined = dynamic(import('@ant-design/icons/PlusOutlined'), {
  ssr: false
})

type TableActionsExtraProps = {
  entityName?: string
  onReloadClick?: () => void
  add?: boolean
} & ViewProps

const MENU_TABLE_SIZE_ITEMS = [
  {
    key: '1',
    type: 'group',
    label: i18n.tableSize,
    children: [
      {
        key: 'small',
        label: 'Pequena'
      },
      {
        key: 'middle',
        label: 'Normal'
      },
      {
        key: 'large',
        label: 'Grande'
      }
    ]
  }
]

const TableActionsExtra = ({
  onReloadClick,
  add,
  ...props
}: TableActionsExtraProps) => {
  const { pathname } = useRouter()
  const [tableSettings, setTableSettings] = useTableSettings()
  const { setModalFiltersVisible } = useContext(LayoutContext)

  return (
    <Space align="center" size="small" {...props}>
      <Tooltip title={i18n.reload}>
        <Button
          shape="circle"
          type="text"
          icon={<ReloadOutlined />}
          onClick={onReloadClick}
          tabIndex={1}
        />
      </Tooltip>
      <Dropdown
        overlay={
          <Menu
            selectedKeys={[tableSettings?.size as string]}
            items={MENU_TABLE_SIZE_ITEMS}
            onClick={({ key }) =>
              setTableSettings(prev => ({ ...prev, size: key as SizeType }))
            }
          />
        }
      >
        <Tooltip title={i18n.tableSize}>
          <Button
            shape="circle"
            type="text"
            icon={<UnorderedListOutlined />}
            tabIndex={1}
          />
        </Tooltip>
      </Dropdown>
      <Tooltip title={i18n.filters}>
        <Button
          shape="circle"
          type="text"
          icon={<FilterOutlined />}
          onClick={() => setModalFiltersVisible(true)}
          tabIndex={1}
        />
      </Tooltip>
      {!add && (
        <Link href={`${pathname}/add`} passHref>
          <Tooltip title={i18n.add}>
            <Div className="flex items-center">
              <Button
                shape="circle"
                type="text"
                icon={<PlusOutlined />}
                id="add"
                autoFocus
                tabIndex={0}
              />
            </Div>
          </Tooltip>
        </Link>
      )}
    </Space>
  )
}

export default TableActionsExtra
