import React, { ReactElement } from 'react'

import { Col, Row, Skeleton } from 'antd'

type FieldSkeletonProps = {
  loading: boolean
  rows?: number
  children: ReactElement
}
const FieldSkeleton = ({ loading, rows = 0, children }: FieldSkeletonProps) => {
  if (loading) {
    return (
      <Row gutter={[16, 16]} className="app-fields-skeleton">
        {Array.from(Array(rows * 2).keys()).map(key => (
          <Col key={key} xs={12} span={6}>
            <Skeleton.Input active style={{ width: '100% !important' }} />
          </Col>
        ))}
      </Row>
    )
  }

  return children
}

FieldSkeleton.defaultProps = {
  rows: 5
}

export default FieldSkeleton
