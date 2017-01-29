import Ajv from 'ajv'
import {formatErrors} from './util/errors'

const ajv = new Ajv({
  v5: true,
  removeAdditional: true,
  useDefaults: true,
  allErrors: true,
  messages: false,
})

export function compileSchema(schema) {
  const validateFn = ajv.compile(schema)

  return function (data) {
    const res = validateFn(data)

    if (!res) {
      const errors = formatErrors(validateFn.errors, schema)

      throw new ValidationError(errors)
    }

    return true
  }
}

export class ValidationError extends Error {
  constructor(errors) {
    super()
    this.errors = errors
    this.message = 'Invalid values provided'
  }
}
