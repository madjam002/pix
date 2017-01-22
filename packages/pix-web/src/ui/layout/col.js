import styled, {css} from 'styled-components'

function divvy(divisions = 12, span = 1) {
  return (100 / divisions) * span
}

const sizes = {
  sm: 500,
  md: 768,
  lg: 1100,
}

const media = Object.keys(sizes).reduce((acc, label) => {
  const accumulator = acc
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const Col = styled.div`
  display: block;
  box-sizing: border-box;
  margin-bottom: ${props => props.theme.layout.push(props.spaceBetween || 2)};
  width: 100%;
  ${props => props.fill ? 'flex: 1;' : ''};

  &:last-child {
    padding-right: 0;
    margin-bottom: 0;
  }

  ${props =>
    props.xs
      ? `width: ${divvy(props.divisions, props.xs)}%;`
      : null
  }
  ${props =>
    props.xsShift
      ? `margin-left: ${divvy(props.divisions, props.xsShift)}%;`
      : null
  }
  ${media.sm`
    ${props =>
      props.sm
        ? `width: ${divvy(props.divisions, props.sm)}%; margin-bottom: 0 !important; padding-right: ${props.theme.layout.push(props.spaceBetween || 2)};`
        : null
    }
    ${props => props.smShift
        ? `margin-left: ${divvy(props.divisions, props.smShift)}%;`
        : null
    }
  `}
  ${media.md`
    ${props =>
      props.md
        ? `width: ${divvy(props.divisions, props.md)}%; margin-bottom: 0 !important; padding-right: ${props.theme.layout.push(props.spaceBetween || 2)};`
        : null
    }
    ${props =>
      props.mdShift
        ? `margin-left: ${divvy(props.divisions, props.mdShift)}%;`
        : null
    }
  `}
  ${media.lg`
    ${props =>
      props.lg
        ? `width: ${divvy(props.divisions, props.lg)}%; margin-bottom: 0 !important; padding-right: ${props.theme.layout.push(props.spaceBetween || 2)};`
        : null
    }
    ${props =>
      props.lgShift
        ? `margin-left: ${divvy(props.divisions, props.lgShift)}%;`
        : null
    }
  `}
`

Col.defaultProps = {
  divisions: 12,
}

export {Col}
