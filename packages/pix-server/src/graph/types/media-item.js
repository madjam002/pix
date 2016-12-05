import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat} from 'graphql'
import {toGlobalId} from 'core/id'
import NodeInterface from '../interfaces/node'
import config from '../../config'

import LibraryItemInterface from '../interfaces/library-item'

const MediaItem = new GraphQLObjectType({
  name: 'MediaItem',
  interfaces: [NodeInterface, LibraryItemInterface],

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: node => toGlobalId(MediaItem.name, node._id),
    },

    name: {
      type: GraphQLString,
    },

    path: {
      type: GraphQLString,
    },

    width: {
      type: GraphQLFloat,
    },

    height: {
      type: GraphQLFloat,
    },

    thumbnail: {
      type: GraphQLString,
      resolve: item => `${config.pixURL}/img/thumb/${item._id.toString()}_medium.jpg`,
    },

    color: {
      type: GraphQLString,
    },
  }),
})

export default MediaItem
