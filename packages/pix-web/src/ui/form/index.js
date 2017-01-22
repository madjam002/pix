import React from 'react'
import styled from 'styled-components'
import {Stacked} from '../layout'

const FormStyle = styled.form`
  margin: 0;
`

export const Form = props => (
  <FormStyle {...props}>
    <Stacked spaceBetween={props.spaceBetween}>
      {props.children}
    </Stacked>
  </FormStyle>
)

Form.defaultProps = {
  spaceBetween: 2,
}

export * from './group'
export * from './inputs'
