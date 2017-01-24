import React from 'react'
import styled from 'styled-components'
import {ContentWithRight} from '../'

export const PageHeaderStyle = styled.h1`
  margin: 0;
  padding: 0;
`

export const PageHeader = props => {
  if (props.buttons) {
    return (
      <ContentWithRight
        align="center"
        content={<PageHeaderStyle>{props.children}</PageHeaderStyle>}
        right={props.buttons}
      />
    )
  }

  return (
    <PageHeaderStyle>{props.children}</PageHeaderStyle>
  )
}
