import mongoose from 'mongoose'

export default mongoose.model('MediaItem', {

  name: String,
  path: String,
  checksum: String,
  width: Number,
  height: Number,
  format: String,
  aspectRatio: Number,
  color: String,
  folder: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'},
  library: {type: mongoose.Schema.Types.ObjectId, ref: 'Library'},

})
