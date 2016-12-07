import sharp from 'sharp'
import parseExif from 'exif-reader'
import path from 'path'
import {imageSize} from './util'
import {genThumbnail, genImageColour, cleanThumbnails} from './image'
import {ensureFoldersForPath, ensureFoldersHaveCover} from './folder'

import MediaItem from 'models/media-item'

export default async function processItem(payload) {
  const { name, file, path: fullPath, libraryId, ignorePatterns } = payload

  let mediaItem = await MediaItem.findOne({ path: file, library: libraryId })
  let folder

  const folderPath = path.dirname(file)
  const matchesIgnoreFilter = checkIfIgnored(file, ignorePatterns)

  if (!mediaItem) {
    if (matchesIgnoreFilter) {
      console.log('Ignoring', file)
      return
    }

    folder = await ensureFoldersForPath(folderPath, libraryId)

    console.log('Processing new item', file)

    mediaItem = await processNew(name, file, libraryId, fullPath, folder)
  } else {
    console.log('Checking', file)

    folder = await ensureFoldersForPath(folderPath, libraryId)

    if (matchesIgnoreFilter) {
      console.log('Removing due to ignored', file)
      await cleanThumbnails(mediaItem)
      await mediaItem.remove()
      return
    }

    if (!mediaItem.nameLower) {
      mediaItem.nameLower = mediaItem.name.toLowerCase()
    }

    if (!mediaItem.filename) {
      mediaItem.filename = path.basename(file)
    }

    // check if fields are missing which requires rebuild of index for this photo
    if (mediaItem.date === undefined) {
      console.log('Rebuilding metadata for', file)
      await rebuildMediaItem(mediaItem, fullPath)
    }

    if (folder != null && mediaItem.folder !== folder._id) {
      console.log('Updating parent folder for item', file)
      mediaItem.folder = folder._id
    }

    if (mediaItem.name !== name) {
      mediaItem.name = name
      console.log('Updated name for', file)
    }

    if (mediaItem.isModified()) {
      console.log('Saving changes for', file)
      await mediaItem.save()
    }

    // TODO check if file has changed
  }

  if (mediaItem) {
    await genThumbnail(fullPath, mediaItem, 'small')
    await genThumbnail(fullPath, mediaItem, 'medium')

    await ensureFoldersHaveCover(mediaItem, folderPath, libraryId)
  }
}

async function getMetaForFile(fullPath) {
  let meta

  try {
    meta = await sharp(fullPath).rotate().metadata()
  } catch (ex) {
    console.log('Failed opening', fullPath, ex.message)
    return null
  }

  const exif = meta.exif != null ? parseExif(meta.exif) : null

  if (exif) {
    delete exif.Padding
  }

  const date = exif != null && exif.exif != null && exif.exif.DateTimeOriginal != null
    ? exif.exif.DateTimeOriginal
    : null

  const size = imageSize(meta, exif)

  return {
    width: size.width,
    height: size.height,
    format: meta.format,
    aspectRatio: size.height / size.width,
    color: await genImageColour(fullPath),
    date,
    exif,
  }
}

async function processNew(name, file, libraryId, fullPath, folder) {
  const metaForDb = await getMetaForFile(fullPath)

  if (!metaForDb) return null

  const nameLower = name.toLowerCase()
  const filename = path.basename(file)

  const mediaItem = new MediaItem({ name, nameLower, filename, path: file, library: libraryId, ...metaForDb, folder: folder != null ? folder._id : null })
  await mediaItem.save()

  return mediaItem
}

async function rebuildMediaItem(mediaItem, fullPath) {
  const metaForDb = await getMetaForFile(fullPath)

  // overwrite existing metadata
  Object.assign(mediaItem, metaForDb)
}

function checkIfIgnored(filePath, ignorePatterns) {
  for (const pattern of ignorePatterns) {
    if (filePath.match(new RegExp(pattern))) {
      return true
    }
  }

  return false
}
