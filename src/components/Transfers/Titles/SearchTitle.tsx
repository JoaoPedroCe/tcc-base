import { useState } from 'react'
import React from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

type SearchTitleProps = {
  placeholder?: string
  onSearch: (value?: string) => void
}

const SearchTitle: React.FC<SearchTitleProps> = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState<string>()

  function onChangeSearch({ target: { value } }: { target: HTMLInputElement }) {
    setSearchValue(value)
    onSearch(value)
  }

  return (
    <Input
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={searchValue}
      onChange={onChangeSearch}
    />
  )
}

export default SearchTitle
