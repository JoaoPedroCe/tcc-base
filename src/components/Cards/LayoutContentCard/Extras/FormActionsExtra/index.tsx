import { SaveOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'


type FormActionsExtraProps = {
  onSave: () => void
}

const FormActionsExtra: React.FC<FormActionsExtraProps> = ({ onSave }) => {
  return (
    <Row gutter={[6, 6]}>
      <Col>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          onClick={() => onSave()}
        >
          Salvar
        </Button>
      </Col>
    </Row>
  )
}

export default FormActionsExtra
