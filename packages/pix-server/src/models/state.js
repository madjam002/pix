import mongoose, {Schema} from 'mongoose'

export default mongoose.model('State', new Schema({}, { strict: false }))
