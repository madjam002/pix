import mongoose, {Schema} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
}

const User = new Schema({
  role: { type: String, default: Roles.USER },
})

User.plugin(passportLocalMongoose)

export default mongoose.model('User', User)
