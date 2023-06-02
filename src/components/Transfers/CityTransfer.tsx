import React, { useCallback, useEffect, useState } from 'react'

import { Spin, Transfer, TransferProps } from 'antd'
import { deburr } from 'lodash'

import useIbgeCities, { IbgeCity } from '~/hooks/useIbgeCities'
import { MedicalGuide } from '~/hooks/useMedicalGuide'
import i18n from '~/i18n'

import SearchTitle from './Titles/SearchTitle'

type RecordType = IbgeCity

type CityTransferProps<T> = {
  UF?: string
  value?: MedicalGuide[]
  onChange: (nextKeys: Array<RecordType>) => void
} & Omit<TransferProps<T>, 'dataSource' | 'onChange'>

const CityTransfer = ({
  UF = '',
  value = [],
  onChange,
  ...props
}: CityTransferProps<RecordType>) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const { data: cities = [], isFetching } = useIbgeCities(UF)
  const [dataSource, setDataSource] = useState<Array<RecordType>>(
    [] as Array<RecordType>
  )

  function onTransferChange(nextTargetKeys: string[]) {
    const nextValues = nextTargetKeys
      .map(key => dataSource.find(({ nome }) => key === nome))
      .flat()
    onChange(nextValues as Array<RecordType>)
  }

  const onSelectChange = (
    sourceSelectedKeys: string[] = [],
    targetSelectedKeys: string[] = []
  ) => {
    setSelectedKeys(
      [...sourceSelectedKeys, ...targetSelectedKeys].filter(Boolean)
    )
  }

  function onSearch(keyword?: string) {
    if (!keyword) return formatDataSource()
    const nextCities = cities.filter(({ nome }) =>
      deburr(nome).toLowerCase().includes(keyword.toLowerCase())
    )
    setDataSource([...nextCities, ...formatValue(value)] as Array<RecordType>)
  }

  function formatValue(value: MedicalGuide[]) {
    return value?.map(({ city, state }) => ({
      nome: city,
      microrregiao: {
        mesorregiao: {
          UF: {
            nome: state
          }
        }
      }
    }))
  }

  const formatDataSource = useCallback(() => {
    if (!cities.length && !value?.length) return
    setDataSource([...cities, ...formatValue(value)] as Array<RecordType>)
  }, [cities, value])

  useEffect(() => {
    formatDataSource()
  }, [formatDataSource])

  useEffect(() => {
    setSelectedKeys([])
  }, [UF])

  return (
    <Spin spinning={isFetching}>
      <Transfer
        {...props}
        className="app-transfer"
        style={{ width: '100%' }}
        titles={[
          <SearchTitle key="0" placeholder={i18n.search} onSearch={onSearch} />,
          ''
        ]}
        dataSource={dataSource}
        targetKeys={value.map(({ city }) => city) as string[]}
        rowKey={({ nome }) => nome as string}
        selectedKeys={selectedKeys}
        onSelectChange={onSelectChange}
        onChange={onTransferChange}
        render={({ nome, microrregiao }) =>
          `${nome} - ${microrregiao?.mesorregiao?.UF.nome}`
        }
      />
    </Spin>
  )
}

export default CityTransfer
