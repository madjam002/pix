import UserModel from 'models/user'
import LibraryModel from 'models/library'
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
  MediaItem: {
    Model: MediaItemModel,
    Type: require('./types/media-item').default,
  },
}

export default map
