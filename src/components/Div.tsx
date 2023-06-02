import { ReactNode } from 'react'

type ViewProps = JSX.IntrinsicElements['div'] & {
  children?: ReactNode | string
}

const Div = ({ children, ...props }: ViewProps) => {
  return <div {...props}>{children}</div>
}

export default Div
