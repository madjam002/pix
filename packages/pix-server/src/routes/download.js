import {idFromGlobalId} from '@pix/core'
import path from 'path'
import invariant from 'invariant'
import fs from 'fs'
import {MediaItem, Library} from '@pix/schema'

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

  const name = path.basename(mediaItem.path)

  res.setHeader('Content-disposition', 'attachment; filename=' + name)

  const fileStream = fs.createReadStream(fullPath)
  fileStream.pipe(res)
}
