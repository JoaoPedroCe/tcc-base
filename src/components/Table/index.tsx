import { useEffect, useState } from 'react'

import { Table, TableProps } from 'antd'
import { debounce } from 'lodash'

import { TableSettings, useTableSettings } from '~/pages/dashboard/settings'

import TableEmptyData from './TableEmptyData'

const AppTable = <RecordType extends object = any>(
  props: TableProps<RecordType>
) => {
  const [tableSettings] = useTableSettings({} as TableSettings)
  const [scrollY, setScrollY] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const debouncedHandleResize = debounce(function handleResize() {
      setScrollY(window.innerHeight - 350)
    }, 1000)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [])

  return (
    <Table
      locale={{ emptyText: <TableEmptyData /> }}
      rowKey="id"
      size={tableSettings?.size}
      scroll={{ x: true, y: scrollY }}
      {...props}
    />
  )
}

export default AppTable
