import sharp from 'sharp'
import {idFromGlobalId} from 'core/id'
import path from 'path'
import invariant from 'invariant'
import MediaItem from 'models/media-item'
import Library from 'models/library'

export default async (req, res) => {
  const id = idFromGlobalId(req.query.id, 'MediaItem')
  const mediaItem = await MediaItem.findById(id)

  if (!mediaItem) {
    res.send('Not found')
    return
  }

  const library = await Library.findById(mediaItem.library)
  invariant(!!library, 'Library not found')

  const libraryPath = library.path
  const fullPath = path.join(libraryPath, mediaItem.path)

  sharp(fullPath)
  .rotate()
  .pipe(res)
}
