import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { MoreOutlined } from '@ant-design/icons'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import { Content } from 'antd/lib/layout/layout'


import { deleteRecord } from '~/utils/record'



type TableActionsPopover = {
  nameField?: string
  onDestroy: () => void
} & any

const TableActionsPopover: React.FC<TableActionsPopover> = ({
  id,
  nameField,
  onDestroyProps,
  children,
  ...props
}) => {
  const [viewSelectVisible, setViewSelectVisible] = useState(false)
  const { pathname } = useRouter()
  const { [nameField]: name } = props

  async function onDestroy() {
    const destroyed = await deleteRecord({
      entity: '',
      id,
      route: pathname,
      name
    })
    if (destroyed) onDestroyProps()
  }

  return (
    <Dropdown
      trigger={['click']}
      visible={viewSelectVisible}
      onVisibleChange={setViewSelectVisible}
      overlay={
        <Menu style={{ width: 'min-content' }}>
          {children}
          <Link href={`${pathname}/edit/${id}`} passHref>
            <Content>
              <Menu.Item>
                <Button type="link" size="small" icon={<EditOutlined />}>
                  Editar
                </Button>
              </Menu.Item>
            </Content>
          </Link>
          <Menu.Divider />
          <Menu.Item onClick={onDestroy}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Apagar
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" size="small" icon={<MoreOutlined />} />
    </Dropdown>
  )
}

TableActionsPopover.defaultProps = {
  nameField: 'name'
}

export default TableActionsPopover
