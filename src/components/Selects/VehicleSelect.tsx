import { Select, SelectProps } from 'antd'

type isVolunteerPartnerProps = { id: number } & SelectProps

const isVolunteerPartnerOptions = [
  { label: 'Audi', value: 'AUDI' },
  { label: 'BMW', value: 'BMW' },
  { label: 'Chevrolet', value: 'CHEVROLET' },
  { label: 'Ford', value: 'FORD' },
  { label: 'Honda', value: 'HONDA' },
  { label: 'Hyundai', value: 'HYUNDAI' },
  { label: 'Mercedes-Benz', value: 'MERCEDES-BENZ' },
  { label: 'Nissan', value: 'NISSAN' },
  { label: 'Toyota', value: 'TOYOTA' },
  { label: 'Volkswagen', value: 'VOLKSWAGEN' }
]

const VehicleSelect = ({ id, ...props }: isVolunteerPartnerProps) => {
  return <Select {...props} options={isVolunteerPartnerOptions} />
}
export default VehicleSelect
