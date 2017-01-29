import mongoose, {Schema} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Roles = {
  ADMIN: 'admin',
  USER: 'user',
}

const User = new Schema({
  role: { type: String, default: Roles.USER },
})

User.plugin(passportLocalMongoose)

const UserModel = mongoose.model('User', User)
UserModel.Roles = Roles

export default UserModel
