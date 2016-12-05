import UserModel from 'models/user'
import LibraryModel from 'models/library'

const map = {
  User: {
    Model: UserModel,
    Type: require('./types/user').default,
  },
  Library: {
    Model: LibraryModel,
    Type: require('./types/library').default,
  },
}

export default map
