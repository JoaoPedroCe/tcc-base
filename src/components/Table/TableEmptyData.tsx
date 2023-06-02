import { Empty } from "antd"

import i18n from "~/i18n"

const TableEmptyData = () => {
  return(
    <Empty
      description={i18n.emptyData}
    />
  )
}

export default TableEmptyData
