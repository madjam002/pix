const defaultVariables = {
  gridUnit: 10,
}

const createTheme = (variables = defaultVariables) => ({
  layout: {
    unit: variables.gridUnit,
    push: count => `${variables.gridUnit * count}px`,
    pull: count => `${-variables.gridUnit * count}px`,
  },
})

export default createTheme()
