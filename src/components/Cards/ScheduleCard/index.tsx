import { Col, Row } from 'antd'

import Div from '~/components/Div'
import ScheduleIcon from '~/components/Status/ScheduleIcon'
import Text from '~/components/Typography/Text'

type ScheduleCardProps = {
  time: string
  customer: string
  vehicle: string
  vehiclePlate: string
  status: string
  cellphone: string
  color: string
}

const ScheduleCard = ({
  time,
  customer,
  cellphone,
  vehiclePlate,
  status,
  vehicle,
  color
}: ScheduleCardProps) => {
  return (
    <Row
      className="flex bg-white drop-shadow-md rounded-lg my-4 mx-4 flex flex-col max-h-md"
      style={{ maxWidth: '400px', width: '400px' }}
    >
      <Col className="flex flex-col p-6 w-5/6">
        <Text className="w-full font-semibold text-xl text-ellipsis overflow-hidden whitespace-nowrap">
          {customer}
        </Text>
        <Text className="mt-2">{cellphone}</Text>
        <Text className="text-base mt-1">
          {vehicle} {vehiclePlate}
        </Text>
        <Row className="flex flex-row items-center mt-2">
          <Text className="text-lg">{time}</Text>
        </Row>
        <Text className="opacity-50">{status}</Text>
      </Col>
      <Col className="flex h-full">
        <Div
          className="h-full	rounded-r-lg w-full"
          style={{ backgroundColor: color, opacity: 0.9 }}
        />
      </Col>
    </Row>
  )
}

export default ScheduleCard
