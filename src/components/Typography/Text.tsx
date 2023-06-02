import React, { ReactNode } from 'react'

type TextProps = {
  tag?: string
  children: ReactNode | string
} & JSX.IntrinsicElements['span']

const Text = ({ tag = 'span', children, ...props }: TextProps) => {
  return React.createElement(tag, props, children)
}

export default Text
