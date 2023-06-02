import { useContext } from 'react'

import { Card, CardProps } from 'antd'
import classNames from 'classnames'

import { LayoutContext } from '~/components/Layout/Default'

type LayoutContentCard = CardProps

const LayoutContentCard = ({
  title: titleProp,
  extra,
  className,
  children,
  ...props
}: LayoutContentCard) => {
  const { title } = useContext(LayoutContext)
  return (
    <Card
      title={titleProp || title}
      extra={extra}
      className={classNames('rounded-md', className)}
      style={{ boxShadow: '0 0 30px 0 rgb(82 63 105 / 5%)' }}
      {...props}
    >
      {children}
    </Card>
  )
}

export default LayoutContentCard
