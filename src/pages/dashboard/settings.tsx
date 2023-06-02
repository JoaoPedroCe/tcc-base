import { LayoutOutlined, SaveOutlined } from '@ant-design/icons'
import { Tab } from '@headlessui/react'
import { Button, Col, Form, Radio, Row } from 'antd'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { useForm } from 'antd/lib/form/Form'
import createPersistedState from 'use-persisted-state'

import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import Text from '~/components/Typography/Text'
import i18n from '~/i18n'

const tableSizes = ['small', 'middle', 'large']

export type TableSettings = {
  size: SizeType
}

export const useTableSettings =
  createPersistedState<TableSettings>('table-settings')

const Settings = () => {
  const [form] = useForm()
  const [_tableSettings, setLayoutSettings] = useTableSettings()

  function onSave(values: TableSettings) {
    setLayoutSettings(values)
  }

  return (
    <DefaultLayout title={i18n.settings}>
      <Div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
        <Tab.Group>
          <Tab.List className="scrollbar-hidden flex w-full flex-row space-x-2 overflow-auto rounded-lg md:w-2/5 md:flex-col md:space-x-0 md:space-y-2 lg:w-1/5 xl:w-1/6">
            <Tab className="flex transform items-center rounded-lg p-3 py-2.5 font-medium leading-5 transition duration-200  md:w-full focus:outline-none bg-component shadow">
              <LayoutOutlined /> <Text className="mx-4">Layout</Text>
            </Tab>
          </Tab.List>
          <Div className="w-full max-w-2xl">
            <Tab.Panels>
              <Tab.Panel className="flex w-full flex-col space-y-6 rounded-md bg-component px-6 py-5 text-gray-900 shadow sm:p-8">
                <Text className="text-xl font-medium leading-6">Tabela</Text>
                <Form form={form} layout="vertical" onFinish={onSave}>
                  <Row>
                    <Col xs={24} span={12}>
                      <Form.Item name="table.size" label="Tamanho da tabela">
                        <Radio.Group>
                          {tableSizes.map(size => (
                            <Radio.Button key={size} value={size}>
                              {i18n[size === 'middle' ? 'normal' : size]}
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Button icon={<SaveOutlined />} onClick={form.submit}>
                        {i18n.save}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Tab.Panel>
            </Tab.Panels>
          </Div>
        </Tab.Group>
      </Div>
    </DefaultLayout>
  )
}

export default Settings
