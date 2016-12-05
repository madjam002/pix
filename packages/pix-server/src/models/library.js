import mongoose from 'mongoose'

export default mongoose.model('Library', {

  name: { type: String, required: true },
  path: { type: String, required: true },
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

})
