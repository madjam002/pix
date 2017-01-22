import React from 'react'
import {Row, Col} from '../layout'

export const PageWithSidebar = props => (
  <Row divisions={24} spaceBetween={4}>
    <Col lg={5} md={7}>
      {props.sidebar}
    </Col>
    <Col fill>
      {props.page}
    </Col>
  </Row>
)
