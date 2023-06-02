import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Col, Input, Modal, ModalFuncProps, Row } from 'antd'

import i18n from '~/i18n'


let inputKeywordValue = ''

type ConfirmActionModalProps = {
  keyword: string
  description?: string
} & ModalFuncProps

export async function confirmActionModal({
  keyword,
  title,
  ...props
}: ConfirmActionModalProps): Promise<Boolean | undefined> {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      ...props,
      width: 600,
      title: `${title}. VOCÊ TEM CERTEZA ABSOLUTA DISSO?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <Row gutter={[0, 8]}>
          <Col span={24}>Por favor, digite o seguinte para confirmar</Col>
          <Col span={24}>{keyword.replace('  ', ' ')}</Col>
          <Col span={24}>
            <Input
              onChange={({ target }) => {
                inputKeywordValue = target.value
              }}
            />
          </Col>
        </Row>
      ),
      okText: i18n.continue,
      onOk: () => {
        if (inputKeywordValue.trim() === keyword.replace('  ', ' '))
          resolve(true)
        reject()
      },
      cancelText: i18n.cancel,
      onCancel: () => reject()
    })
  })
}
