import React from 'react'
import {Stacked} from '../layout'

export const Page = props => (
  <Stacked spaceBetween={props.spaceBetween}>
    {props.children}
  </Stacked>
)

Page.defaultProps = {
  spaceBetween: 2,
}
