import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList} from 'graphql'
import {toGlobalId} from 'core/id'
import NodeInterface from '../interfaces/node'

import LibraryItemInterface from '../interfaces/library-item'

const LibraryType = new GraphQLObjectType({
  name: 'Library',
  interfaces: [NodeInterface],

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: node => toGlobalId(LibraryType.name, node._id),
    },

    name: {
      type: GraphQLString,
    },

    items: {
      type: new GraphQLList(LibraryItemInterface),
      resolve: library => generateItems(library),
    },
  }),
})

export default LibraryType

import Folder from 'models/folder'
import MediaItem from 'models/media-item'

const generateItems = async (library) => {
  const folders = await Folder.find({ parent: null, library: library._id }).sort({ nameLower: 1 })
  const mediaItems = await MediaItem.find({ folder: null, library: library._id }).sort({ nameLower: 1 })

  folders.forEach(node => node.__type = 'Folder')
  mediaItems.forEach(node => node.__type = 'MediaItem')

  return [
    ...folders,
    ...mediaItems,
  ]
}
