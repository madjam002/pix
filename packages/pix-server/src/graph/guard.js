import {User} from '@pix/schema'

export function createFieldGuarder(checker) {
  return function (resolver) {
    return function (node, args, ctx, { fieldName }) {
      if (checker(...arguments)) {
        return resolver ? resolver(...arguments) : node[fieldName]
      } else {
        return null
      }
    }
  }
}

export const guardFieldLoggedInOnly = createFieldGuarder(
  (node, args, req) => req.user != null,
)

export const guardFieldAdmin = createFieldGuarder(
  (node, args, req) => req.user != null && req.user.role === User.Roles.ADMIN,
)
