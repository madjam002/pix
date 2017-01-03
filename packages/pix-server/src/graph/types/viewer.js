import {GraphQLObjectType, GraphQLList, GraphQLBoolean} from 'graphql'
import UserType from './user'
import LibraryType from './library'

import {Roles} from 'models/user'
import Library from 'models/library'

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',

  fields: () => ({
    user: {
      type: UserType,
      resolve: (__, args, req) => req.user,
    },

    libraries: {
      type: new GraphQLList(LibraryType),
      resolve: (__, args, req) => Library.find(),
    },

    isAdmin: {
      type: GraphQLBoolean,
      resolve: (__, args, req) => req.user && req.user.role === Roles.ADMIN,
    },
  }),
})

export default ViewerType
