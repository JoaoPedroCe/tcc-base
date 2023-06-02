import dynamic from 'next/dynamic'

import {
  CheckboxProps,
  Col,
  Form,
  FormRule,
  InputProps,
  SelectProps
} from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'

const Input = dynamic(() => import('antd/lib/input'), { ssr: false })
const Select = dynamic(() => import('antd/lib/select'), { ssr: false })
const Checkbox = dynamic(() => import('antd/lib/checkbox'), { ssr: false })

export type FilterProps<ValuesType> = {
  span?: number | string
  type?: 'input' | 'select' | 'checkbox' | 'masked-input'
  label?: string
  name: keyof ValuesType
  valuePropName?: string
  rules?: FormRule[]
  /**
   * render your own component
   *
   * When the component type is "checkbox" inform the @param valuePropName as "checked"
   *
   */
  render?: (values: ValuesType, form: FormInstance<ValuesType>) => JSX.Element
  tag?: (value: any) => string
  props?: InputProps & SelectProps<any, any> & CheckboxProps
}

const Filter = <ValuesType extends unknown>({
  span = 12,
  type = 'input',
  label,
  name,
  rules,
  valuePropName = undefined,
  render,
  props
}: FilterProps<ValuesType>) => {
  const form = Form.useFormInstance<ValuesType>()

  function renderFilter() {
    if (render) return render(form.getFieldsValue(), form)
    switch (type) {
      case 'input':
        return <Input {...props} />
      case 'select':
        return <Select {...props} />
      case 'checkbox':
        return <Checkbox {...props} />
      default:
        return null
    }
  }

  return (
    <Col span={span}>
      <Form.Item
        label={label}
        name={name as string}
        valuePropName={type === 'checkbox' ? 'checkbox' : valuePropName}
        rules={rules}
        shouldUpdate={(prevValues, curValues) =>
          prevValues[name] !== curValues[name]
        }
      >
        {renderFilter()}
      </Form.Item>
    </Col>
  )
}

export default Filter
