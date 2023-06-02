import { message, Modal } from 'antd'

import i18n from '~/i18n'
import api from '~/services/api'

type DeleteRecord = {
  entity: string
  name: string
  route: string
  id?: number | string
}

export async function deleteRecord({
  entity,
  name,
  route,
  id
}: DeleteRecord): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    Modal.confirm({
      title: i18n.attention,
      content: i18n.delete.confirmation({ entity, name }),
      okText: i18n.yes,
      cancelText: i18n.cancel,
      onCancel: () => resolve(false),
      onOk: async () => {
        try {
          await api.delete(`admin/${route}/${id}`)
          message.success(i18n.delete.success(name))
          resolve(true)
        } catch (error) {
          message.error(i18n.couldNotDelete)
        }
      }
    })
  })
}
