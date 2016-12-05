import {GraphQLObjectType, GraphQLList} from 'graphql'
import UserType from './user'
import LibraryType from './library'

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
  }),
})

export default ViewerType
