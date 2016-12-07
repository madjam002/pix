import {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLFloat} from 'graphql'
import {toGlobalId} from 'core/id'
import NodeInterface from '../interfaces/node'
import config from '../../config'
import MediaItemModel from 'models/media-item'
import Library from 'models/library'
import Folder from 'models/folder'

import LibraryItemInterface from '../interfaces/library-item'
import LibraryType from './library'
import FolderType from './folder'
import ExifType from './exif'

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

    filename: {
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

    date: {
      type: GraphQLString,
      resolve: item => item.date != null ? item.date.toISOString() : null,
    },

    library: {
      type: LibraryType,
      resolve: item => Library.findById(item.library),
    },

    folder: {
      type: FolderType,
      resolve: item => Folder.findById(item.folder),
    },

    exif: {
      type: ExifType,
      resolve: item => item.exif,
    },

    next: {
      type: MediaItem,
      resolve: async item => (await MediaItemModel.find({ folder: item.folder, nameLower: { $gt: item.nameLower } }).sort({ nameLower: 1 }).limit(1))[0],
    },

    previous: {
      type: MediaItem,
      resolve: async item => (await MediaItemModel.find({ folder: item.folder, nameLower: { $lt: item.nameLower } }).sort({ nameLower: -1 }).limit(1))[0],
    },
  }),
})

export default MediaItem
