import React, { PropTypes } from 'react'
import styled from 'styled-components'

const StackedStyle = styled.div`
  display: flex;
  flex-direction: column;
`

const Cell = styled.div`
  &:not(:last-child) {
    margin-top: ${props => props.spaceBefore ? props.theme.layout.push(props.spaceBefore) : 0};
    margin-bottom: ${props => props.spaceAfter ? props.theme.layout.push(props.spaceAfter) : 0};
  }
`

export const Stacked = props => (
  <StackedStyle {...props}>
    {React.Children.map(props.children, child =>
      child
      ? <Cell spaceBefore={child.props && child.props.spaceBefore} spaceAfter={(child.props && child.props.spaceAfter) || props.spaceBetween}>
        {child}
      </Cell>
      : null,
    )}
  </StackedStyle>
)

Stacked.defaultProps = {
  spaceBetween: 1,
}

Stacked.propTypes = {
  spaceBetween: PropTypes.number,
}
