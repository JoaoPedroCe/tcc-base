import { useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Button, Image, Space, Upload, UploadProps } from 'antd'

import i18n from '~/i18n'
import { GetTypeofProperty } from '~/types'

type BasicImageUploadProps = {
  value: string | undefined | null
  onChange?: GetTypeofProperty<UploadProps, 'onChange'>
  onChangeSrc: (src: string) => void
}

const BasicImageUpload = ({
  value,
  onChange: onChangeProp,
  onChangeSrc
}: BasicImageUploadProps) => {
  const [coverInUploading, setCoverInUploading] = useState(false)
  return (
    <Upload
      showUploadList={false}
      onChange={async info => {
        const { file } = info
        const { status, response } = file
        if (status === 'uploading') setCoverInUploading(true)
        if (status === 'error') setCoverInUploading(false)
        if (status === 'done') {
          let src = response
          if (onChangeSrc) onChangeSrc(src)

          if (onChangeProp) onChangeProp(info)
          setCoverInUploading(false)
        }
      }}
      disabled={coverInUploading}
    >
      <Space direction="vertical">
        <Image
          preview={false}
          width={120}
          height={160}
          alt="Cover"
          src={value as string}
        />
        <Button
          type="primary"
          block
          size="small"
          icon={<UploadOutlined />}
          loading={coverInUploading}
        >
          {i18n.send}
        </Button>
      </Space>
    </Upload>
  )
}

export default BasicImageUpload
