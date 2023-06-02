import { Button } from 'antd'
import { Menu2, X } from 'tabler-icons-react'

import { useSidebarCollapsedState } from '../Layout/Default/Sidebar'

const ToggleSidebarButton = () => {
  const [collapsed, setCollapsed] = useSidebarCollapsedState()

  return (
    <Button shape="circle" type="text" onClick={() => setCollapsed(!collapsed)}>
      {!collapsed ? <X /> : <Menu2 size={30} />}
    </Button>
  )
}

export default ToggleSidebarButton
