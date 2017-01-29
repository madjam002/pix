import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql'
import {toGlobalId} from '@pix/core'
import NodeInterface from '../interfaces/node'

const UserType = new GraphQLObjectType({
  name: 'User',
  interfaces: [NodeInterface],

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the user.',
      resolve: user => toGlobalId(UserType.name, user._id),
    },

    username: {
      type: GraphQLString,
    },

    role: {
      type: GraphQLString,
    },
  }),
})

export default UserType
