import React from 'react'
import styled from 'styled-components'

const RowStyle = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${props => props.alignContent
    ? `align-content: ${props.alignContent};`
    : null
  }
  ${props => props.alignItems
    ? `align-items: ${props.alignItems};`
    : null
  }
  ${props => props.alignSelf
    ? `align-self: ${props.alignSelf};`
    : null
  }
  ${props => props.justifyContent
    ? `justify-content: ${props.justifyContent};`
    : null
  }
  ${props => props.order
    ? `order: ${props.order};`
    : null
  }
`

export const Row = props => (
  <RowStyle {...props}>
    {React.Children.map(props.children, child => {
      return React.cloneElement(child, { spaceBetween: props.spaceBetween, divisions: props.divisions })
    })}
  </RowStyle>
)
