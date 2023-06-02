import generatePicker from 'antd/lib/date-picker/generatePicker'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')
dayjs.extend(weekday)
dayjs.extend(localeData)
const DatePicker = generatePicker(dayjsGenerateConfig)

export default DatePicker
