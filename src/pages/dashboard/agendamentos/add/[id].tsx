import { useState } from 'react'

import { useRouter } from 'next/router'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Col, Form, notification, Row, Spin } from 'antd'
import { MaskedInput } from 'antd-mask-input'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import Div from '~/components/Div'
import DefaultLayout from '~/components/Layout/Default'
import BudgetSelect from '~/components/Selects/BudgetSelect'
import CustomerSelect from '~/components/Selects/CustomersSelect'
import useCollectiveAgreement, {
  CollectiveAgreement
} from '~/hooks/useCollectiveAgreement'
import useCollectiveAgreementMutation from '~/hooks/useCollectiveAgreementMutation'
import useRouterParams from '~/hooks/useRouterParams'
import i18n from '~/i18n'
import { formatJsonToApi, transformErrors } from '~/utils/form'
import { dateWithHours } from '~/utils/masks'

const AddOrUpdateCollectiveAgreement = () => {
  const { back } = useRouter()
  const { id } = useRouterParams()
  const { data: collectiveAgreement, isFetching } = useCollectiveAgreement(id)
  const [title] = useState('Adicionar Agendamento')
  const [form] = Form.useForm<CollectiveAgreement>()
  const { setFields, getFieldsValue, submit, setFieldValue } = form
  const { mutateAsync: storeOrUpdateCollectiveAgreementMutate, isLoading } =
    useCollectiveAgreementMutation()

  async function storeOrUpdateCollectiveAgreement(values: CollectiveAgreement) {
    try {
      if (isLoading) return

      await storeOrUpdateCollectiveAgreementMutate(
        formatJsonToApi({ data: { ...collectiveAgreement, ...values } })
      )
      notification.success({
        message: i18n.success,
        description: i18n.crud[id ? 'edit' : 'add'](i18n.company)
      })
      back()
    } catch (e) {
      setFields(transformErrors(e, getFieldsValue()))
    }
  }

  return (
    <DefaultLayout title={title}>
      <LayoutContentCard
        actions={[
          <Div key="actions" className="flex justify-end px-4">
            <Button
              type="dashed"
              size="large"
              icon={<CloseOutlined />}
              loading={isFetching || isLoading}
              onClick={back}
            >
              {i18n.cancel}
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<SaveOutlined />}
              loading={isFetching || isLoading}
              onClick={submit}
            >
              {i18n.save}
            </Button>
          </Div>
        ]}
      >
        <Spin spinning={isFetching || isLoading}>
          <Form
            form={form}
            initialValues={collectiveAgreement}
            onFinish={storeOrUpdateCollectiveAgreement}
            validateTrigger={false}
            layout="vertical"
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item label="Orçamento" name="budget" required>
                  <BudgetSelect />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item label="Data e Horário" name="schedule" required>
                  <MaskedInput
                    mask={dateWithHours}
                    maskOptions={{ lazy: true }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={12} span={6}>
                <Form.Item label="Cliente" name="customer" required>
                  <CustomerSelect />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default AddOrUpdateCollectiveAgreement
