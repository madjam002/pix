import {
  User as UserModel,
  Library as LibraryModel,
  Folder as FolderModel,
  MediaItem as MediaItemModel,
} from '@pix/schema'

const map = {
  User: {
    Model: UserModel,
    Type: require('./types/user').default,
  },
  Library: {
    Model: LibraryModel,
    Type: require('./types/library').default,
  },
  Folder: {
    Model: FolderModel,
    Type: require('./types/folder').default,
  },
  MediaItem: {
    Model: MediaItemModel,
    Type: require('./types/media-item').default,
  },
}

export default map
