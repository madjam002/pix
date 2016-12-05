import sharp from 'sharp'
import parseExif from 'exif-reader'
import path from 'path'
import {imageSize} from './util'
import {genThumbnail, genImageColour} from './image'
import {ensureFoldersForPath, ensureFoldersHaveCover} from './folder'

import MediaItem from 'models/media-item'

export default async function processItem(payload) {
  const { name, file, path: fullPath, libraryId } = payload

  let mediaItem = await MediaItem.findOne({ path: file, library: libraryId })

  const folderPath = path.dirname(file)
  const folder = await ensureFoldersForPath(folderPath, libraryId)

  if (!mediaItem) {
    console.log('Processing new item', file)

    mediaItem = await processNew(name, file, libraryId, fullPath, folder)
  } else {
    console.log('Checking', file)

    if (folder != null && mediaItem.folder !== folder._id) {
      console.log('Updating folder for', file)
      mediaItem.folder = folder._id
      await mediaItem.save()
    }

    if (mediaItem.name !== name) {
      mediaItem.name = name
      await mediaItem.save()
      console.log('Updated name for', file)
    }

    // TODO check if file has changed
  }

  if (mediaItem) {
    await genThumbnail(fullPath, mediaItem, 'small')
    await genThumbnail(fullPath, mediaItem, 'medium')

    await ensureFoldersHaveCover(mediaItem, folderPath, libraryId)
  }
}

async function processNew(name, file, libraryId, fullPath, folder) {
  let meta

  try {
    meta = await sharp(fullPath).rotate().metadata()
  } catch (ex) {
    console.log('Failed opening', fullPath, ex.message)
    return
  }

  const exif = meta.exif != null ? parseExif(meta.exif) : {}

  const size = imageSize(meta, exif)

  const metaForDb = {
    width: size.width,
    height: size.height,
    format: meta.format,
    aspectRatio: size.height / size.width,
    color: await genImageColour(fullPath),
  }

  const mediaItem = new MediaItem({ name, path: file, library: libraryId, ...metaForDb, folder: folder != null ? folder._id : null })
  await mediaItem.save()

  return mediaItem
}
