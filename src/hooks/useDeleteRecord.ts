import { useState } from 'react'

import { message, Modal } from 'antd'

import i18n from '~/i18n'
import api from '~/services/api'

export default function useDeleteRecord(
  entity: string,
  route: string
): {
  deleteRecord: (name: string, id: number | string) => Promise<boolean>
  isErasing: boolean
} {
  const [isErasing, setIsErasing] = useState(false)

  async function deleteRecord(
    name: string,
    id: number | string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Modal.confirm({
        title: i18n.attention,
        content: i18n.delete.confirmation({ entity, name }),
        okText: i18n.yes,
        cancelText: i18n.cancel,
        onCancel: () => resolve(false),
        onOk: async () => {
          try {
            setIsErasing(true)
            await api.delete(`${route}/${id}/`)
            message.success(i18n.delete.success(name))
            setIsErasing(false)
            resolve(true)
          } catch (error) {
            reject(error)
          }
        }
      })
    })
  }

  return { deleteRecord, isErasing }
}
