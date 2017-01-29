import {GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLInputObjectType} from 'graphql'
import invariant from 'invariant'
import UserType from '../types/user'
import {User} from '@pix/schema'

const OutputType = new GraphQLObjectType({
  name: 'CreateUserPayload',

  fields: () => ({
    user: {
      type: new GraphQLNonNull(UserType),
    },
  }),
})

const InputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',

  fields: () => ({
    username: {
      type: GraphQLString,
    },

    password: {
      type: GraphQLString,
    },
  }),
})

export default {
  type: OutputType,
  args: {
    user: {
      type: new GraphQLNonNull(InputType),
    },
  },
  resolve: (_, args, req) => runMutation(args, req),
}

async function runMutation(args, req) {
  invariant(!!req.user, 'Not logged in')
  invariant(req.user.role === User.Roles.ADMIN, 'Not admin')

  const user = new User(args.user)
  await new Promise((resolve, reject) => User.register(user, args.user.password, err => err != null ? reject(err) : resolve()))

  return { user }
}
