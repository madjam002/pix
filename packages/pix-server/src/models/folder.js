import mongoose from 'mongoose'

export default mongoose.model('Folder', {

  name: {type: String, required: true},
  nameLower: {type: String, required: true},
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'},
  library: {type: mongoose.Schema.Types.ObjectId, ref: 'Library', required: true},
  cover: {type: mongoose.Schema.Types.ObjectId, ref: 'MediaItem'},
  path: {type: String, required: true},

})
