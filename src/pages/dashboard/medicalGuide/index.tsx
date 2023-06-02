import React, { useState } from 'react'

import { Form } from 'antd'

import LayoutContentCard from '~/components/Cards/LayoutContentCard'
import DefaultLayout from '~/components/Layout/Default'
import StateSelect from '~/components/Selects/StateSelect'
import CityTransfer from '~/components/Transfers/CityTransfer'
import { IbgeCity } from '~/hooks/useIbgeCities'
import useMedicalGuide from '~/hooks/useMedicalGuide'
import useMedicalGuideMutation from '~/hooks/useMedicalGuideMutation'
import { State } from '~/hooks/useState'
import i18n from '~/i18n'

const MedicalGuide = () => {
  const [selectedState, setSelectedState] = useState<State>({} as State)
  const { mutate: MedicalGuideMutation } = useMedicalGuideMutation()
  const { data: medicalGuild } = useMedicalGuide()

  function onCityTransferChange(cities: IbgeCity[]) {
    MedicalGuideMutation(cities)
  }

  return (
    <DefaultLayout title={i18n.medicalGuide}>
      <LayoutContentCard>
        <Form validateTrigger={false} layout="vertical">
          <Form.Item label={i18n.state}>
            <StateSelect
              style={{ width: '100%' }}
              labelInValue
              initialFilters={{ sortColumn: 'name', perPage: 30 }}
              onChange={(_, state) =>
                setSelectedState(state as unknown as State)
              }
            />
          </Form.Item>

          <Form.Item label={i18n.city}>
            <CityTransfer
              UF={selectedState?.abbreviation}
              value={medicalGuild}
              onChange={onCityTransferChange}
            />
          </Form.Item>
        </Form>
      </LayoutContentCard>
    </DefaultLayout>
  )
}

export default MedicalGuide
