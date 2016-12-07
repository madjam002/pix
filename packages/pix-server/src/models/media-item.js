import mongoose from 'mongoose'

export default mongoose.model('MediaItem', {

  name: { type: String, required: true },
  nameLower: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  checksum: String,
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: String,
  aspectRatio: Number,
  color: String,
  date: Date,
  exif: Object,
  folder: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder'},
  library: {type: mongoose.Schema.Types.ObjectId, ref: 'Library'},

})
