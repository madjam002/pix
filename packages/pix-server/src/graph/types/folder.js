import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat} from 'graphql'
import {toGlobalId} from '@pix/core'
import NodeInterface from '../interfaces/node'
import config from '../../config'

import {Library} from '@pix/schema'

import LibraryItemInterface from '../interfaces/library-item'
import LibraryType from './library'

const FolderType = new GraphQLObjectType({
  name: 'Folder',
  interfaces: [NodeInterface, LibraryItemInterface],

  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: node => toGlobalId(FolderType.name, node._id),
    },

    name: {
      type: GraphQLString,
    },

    path: {
      type: GraphQLString,
    },

    items: {
      type: new GraphQLList(LibraryItemInterface),
      resolve: library => generateItems(library),
    },

    width: {
      type: GraphQLFloat,
      resolve: async folder => folder.cover && (await MediaItem.findById(folder.cover)).width,
    },

    height: {
      type: GraphQLFloat,
      resolve: async folder => folder.cover && (await MediaItem.findById(folder.cover)).height,
    },

    thumbnail: {
      type: GraphQLString,
      resolve: folder => folder.cover && `${config.pixURL}/img/thumb/${folder.cover.toString()}_medium.jpg`,
    },

    library: {
      type: LibraryType,
      resolve: folder => Library.findById(folder.library),
    },
  }),
})

export default FolderType

import {MediaItem, Folder} from '@pix/schema'

const generateItems = async (folder) => {
  const folders = await Folder.find({ parent: folder._id }).sort({ nameLower: 1 })
  const mediaItems = await MediaItem.find({ folder: folder._id }).sort({ nameLower: 1 })

  folders.forEach(node => node.__type = 'Folder')
  mediaItems.forEach(node => node.__type = 'MediaItem')

  return [
    ...folders,
    ...mediaItems,
  ]
}
