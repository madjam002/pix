import {GraphQLInterfaceType, GraphQLNonNull, GraphQLID, GraphQLString} from 'graphql'

export default new GraphQLInterfaceType({
  name: 'LibraryItem',

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },

    name: {
      type: GraphQLString,
    },

    path: {
      type: GraphQLString,
    },
  }),

  resolveType: node => {
    const TYPE_MAP = {
      'MediaItem': require('../types/media-item').default,
      'Folder': require('../types/folder').default,
    }

    return TYPE_MAP[node.__type]
  },
})
