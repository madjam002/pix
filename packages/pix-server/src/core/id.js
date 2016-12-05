import invariant from 'invariant'
import {fromGlobalId as _fromGlobalId, toGlobalId} from 'graphql-relay'

export {toGlobalId}

export function fromGlobalId(globalId, expectedType) {
  const ids = _fromGlobalId(globalId)

  if (expectedType !== undefined) {
    invariant(expectedType === ids.type, 'fromGlobalId(): Type of ID does not match expectedType: ' + expectedType)
  }

  return ids
}

export function idFromGlobalId(globalId, expectedType) {
  return fromGlobalId(globalId, expectedType).id
}
