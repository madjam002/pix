import {GraphQLObjectType, GraphQLSchema, GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList} from 'graphql'
import {idFromGlobalId} from '@pix/core'
import {guardFieldAdmin} from './guard'
import {nodeField} from './interfaces/node'
import ViewerType from './types/viewer'
import {getState} from '../state'

import UserType from './types/user'

import {User, Folder} from '@pix/schema'

import nodeResolver from './resolvers/node'

const nodeResolverArgs = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
}

const typeSpecificResolver = (obj, {id}, context, info) => nodeResolver(id, context, info)

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,

    viewer: {
      type: ViewerType,
      resolve: () => ({}),
    },

    isFirstRun: {
      type: GraphQLBoolean,
      resolve: async () => (await getState()).firstRun,
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: guardFieldAdmin(() => User.find()),
    },

    user: {
      type: require('./types/user').default,
      args: nodeResolverArgs,
      resolve: typeSpecificResolver,
    },

    library: {
      type: require('./types/library').default,
      args: nodeResolverArgs,
      resolve: typeSpecificResolver,
    },

    folder: {
      type: require('./types/folder').default,
      args: nodeResolverArgs,
      resolve: typeSpecificResolver,
    },

    folderByPath: {
      type: require('./types/folder').default,
      args: {
        libraryId: { type: new GraphQLNonNull(GraphQLID) },
        path: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (__, args) => Folder.findOne({ path: args.path, library: idFromGlobalId(args.libraryId, 'Library') }),
    },

    mediaItem: {
      type: require('./types/media-item').default,
      args: nodeResolverArgs,
      resolve: typeSpecificResolver,
    },
  }),
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createLibrary: require('./mutations/create-library').default,
    editLibrary: require('./mutations/edit-library').default,
    createUser: require('./mutations/create-user').default,
  }),
})

const schema = new GraphQLSchema({
  query,
  mutation,
})

export default schema
