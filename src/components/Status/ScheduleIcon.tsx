import Div from '../Div'
import Text from '../Typography/Text'

type ScheduleIconProps = {
  color: string
}

const ScheduleIcon = ({ color }: ScheduleIconProps) => {
  return (
    <Div
      className="rounded-full animate-pulse ml-1"
      style={{ height: '20px', width: '20px', backgroundColor: color }}
    />
  )
}

export default ScheduleIcon
