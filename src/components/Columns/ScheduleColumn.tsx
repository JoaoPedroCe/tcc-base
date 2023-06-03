import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'

import { Row } from 'antd'

import Div from '../Div'
import Text from '../Typography/Text'

type ScheduleColumnProps = {
  children: React.ReactNode | Array<React.ReactNode>
  title: string
  date: string
}

const ScheduleColumn = ({ children, title, date }: ScheduleColumnProps) => {
  return (
    <Div className="bg-slate-100	flex rounded-sm flex-col drop-shadow-lg">
      <Div
        style={{ backgroundColor: '#D8F3DC' }}
        className="w-full flex justify-between items-center rounded-md px-4 py-2"
      >
        <Text style={{ color: '#40916C' }} className="font-bold text-3xl">
          {title} - {date}
        </Text>
        <AiOutlineClockCircle size={60} color="#40916C" />
      </Div>
      <Row className="p-4 w-full justify-between">{children}</Row>
    </Div>
  )
}

export default ScheduleColumn
