import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { EllipsisOutlined } from '@ant-design/icons'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Space } from 'antd'

import { deleteRecord } from '~/utils/record'

type TableActionsPopover = {
  nameField?: string
  edit?: boolean
  destroyRoute?: string
  beforeDestroy: () => Promise<Boolean>
  onDestroy: () => void
} & any

const TableActionsCell: React.FC<TableActionsPopover> = ({
  id,
  nameField,
  edit,
  destroyRoute,
  beforeDestroy,
  onDestroy: onDestroyProps,
  children,
  ...props
}) => {
  const [viewSelectVisible, setViewSelectVisible] = useState(false)
  const { pathname } = useRouter()
  const { [nameField]: name } = props

  async function onDestroy() {
    if (beforeDestroy) {
      if (!(await beforeDestroy())) return
    }
    const destroyed = await deleteRecord({
      entity: '',
      id,
      route: destroyRoute || pathname,
      name
    })
    if (destroyed) onDestroyProps()
  }

  return (
    <Space size="small">
      {edit && (
        <Link href={`${pathname}/edit/${id}`} passHref>
          <Button
            type="primary"
            size="small"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}
            icon={<EditOutlined />}
          />
        </Link>
      )}
      <Dropdown
        trigger={['click']}
        visible={viewSelectVisible}
        onVisibleChange={setViewSelectVisible}
        overlay={
          <Menu style={{ width: 'min-content' }}>
            {children && (
              <>
                {children}
                <Menu.Divider />
              </>
            )}
            <Menu.Item onClick={onDestroy}>
              <Button type="link" size="small" danger icon={<DeleteOutlined />}>
                Apagar
              </Button>
            </Menu.Item>
          </Menu>
        }
      >
        <Button size="small" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space>
  )
}

TableActionsCell.defaultProps = {
  nameField: 'name',
  edit: true
}

export default TableActionsCell
