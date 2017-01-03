import UserModel from 'models/user'
import LibraryModel from 'models/library'
import FolderModel from 'models/folder'
import MediaItemModel from 'models/media-item'

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
