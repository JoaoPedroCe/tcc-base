
import React, { useContext, useEffect } from 'react'

import { Form, Modal, ModalProps, Row } from 'antd'

import i18n from '~/i18n'
import { AnyObject } from '~/types'

import { LayoutContext } from '../../Layout/Default'
import Filter, { FilterProps } from './Filter'

type TableFiltersModelProps<ValuesType> = {
  filters: Array<FilterProps<ValuesType>>
  values: ValuesType
  onApplying: (nextFilters: ValuesType) => void
} & ModalProps

const TableFiltersModel = <ValuesType extends AnyObject>({
  filters,
  values,
  onApplying
}: TableFiltersModelProps<ValuesType>) => {
  const { modalFiltersVisible, setModalFiltersVisible } =
    useContext(LayoutContext)
  const [form] = Form.useForm<ValuesType>()
  const { getFieldsValue, resetFields } = form

  function onFinish(values: ValuesType) {
    onApplying(values)
    setModalFiltersVisible(false)
  }

  function onClear() {
    onApplying({} as ValuesType)
    resetFields()
    setModalFiltersVisible(false)
  }

  useEffect(() => {
    const formValues = getFieldsValue()
    if (values !== formValues) {
      const resetFieldsNames = Object.keys(formValues).filter(
        key => !values[key]
      )
      resetFields(resetFieldsNames)
    }
  }, [values, getFieldsValue, resetFields])

  return (
    <Modal
      title={i18n.filters}
      visible={modalFiltersVisible}
      okText={i18n.toApply}
      onOk={form.submit}
      cancelText={i18n.clear}
      onCancel={onClear}
      destroyOnClose={false}
    >
      <Form form={form} onFinish={onFinish} size="large" layout="vertical">
        <Row gutter={[16, 16]}>
          {filters.map((props, key) => (
            <Filter<ValuesType> key={key} {...props} />
          ))}
        </Row>
      </Form>
    </Modal>
  )
}

export default TableFiltersModel
