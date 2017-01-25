/* @flow */

import _ from 'lodash'

export function formatErrors(errors, schema) {
  const res = {}

  for (const error of errors) {
    parseError(error, schema, res)
  }

  return res
}

function parseError(error, schema, res) {
  const { keyword, params } = error

  const dataPath = error.dataPath.split('.').filter(path => path.trim() !== '')

  if (keyword === 'required') {
    dataPath.push(params.missingProperty)
  }

  const existingErrors = _.get(res, dataPath) || []
  existingErrors.push(errorMessage(error, schema))

  _.set(res, dataPath.join('.'), existingErrors[0])
}

function errorMessage(error, schema) {
  const { keyword, schemaPath, params } = error

  const errorMessagesPath = (schemaPath.substring(1, schemaPath.lastIndexOf('/') + 1) + 'errorMessages')
    .replace(/\//g, '.').substring(1)

  const customErrorMessages = _.get(schema, errorMessagesPath)

  if (customErrorMessages && customErrorMessages[keyword]) {
    let customErrorMessage = customErrorMessages[keyword]

    if (keyword === 'required') {
      customErrorMessage = customErrorMessage[params.missingProperty]
    }

    if (customErrorMessage) {
      return customErrorMessage
    }
  }

  if (DEFAULT_MESSAGES[keyword]) {
    return DEFAULT_MESSAGES[keyword](params)
  }

  return 'Invalid value'
}

const DEFAULT_MESSAGES = {
  required: params => 'This field is required',
  type: params => 'Invalid type',
}
