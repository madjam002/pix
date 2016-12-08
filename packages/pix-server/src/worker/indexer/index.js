import glob from 'glob-promise'
import path from 'path'
import Library from 'models/library'
import kue from 'service/kue'
import Bluebird from 'bluebird'
import Folder from 'models/folder'
import MediaItem from 'models/media-item'
import {cleanThumbnails} from './image'

export default async function indexLibrary(libraryId, job) {
  const library = await Library.findById(libraryId)
  const libraryPath = library.path

  console.log('Indexing', libraryPath)

  const files = (await glob('**/*.*', { cwd: libraryPath }))
  .filter(file => !checkIfIgnored(file, library.ignorePatterns))

  console.log('Got', files.length, 'photos')

  let numComplete = 0
  const total = files.length

  await Bluebird.map(files, async file => {
    const fullPath = path.join(libraryPath, file)
    const name = path.basename(file, path.extname(file))

    const itemJob = await kue.create('library:process:item', { name, file, path: fullPath, libraryId })
    await itemJob.saveAsync()

    await new Promise(resolve => {
      itemJob.once('complete', resolve)
      itemJob.once('failed', resolve)
    })

    job.progress(++numComplete, total, { currentName: file })
    console.log('Complete', numComplete, 'left', total - numComplete)
  }, { concurrency: 100 })

  console.log('Cleaning removed files')

  await cleanRemovedFiles(library, files)

  console.log('Cleaning empty folders')

  await removeEmptyFolders(library, null)

  console.log('Done')
}

async function removeEmptyFolders(library, parent) {
  const folders = await Folder.find({ library: library._id, parent })

  await Bluebird.map(folders, async folder => {
    console.log('Checking', folder.path)
    const mediaItems = await MediaItem.find({ library: library._id, folder: folder._id })
    let subFolders = await Folder.find({ library: library._id, parent: folder._id })

    if (subFolders.length > 0) {
      // check sub folders first and then refetch sub folders to see if any have been removed
      await removeEmptyFolders(library, folder._id)

      subFolders = await Folder.find({ library: library._id, parent: folder._id })
    }

    if (mediaItems.length === 0 && subFolders.length === 0) {
      console.log('Removing empty folder', folder.path)
      await folder.remove()
      return
    }
  }, { concurrency: 20 })
}

async function cleanRemovedFiles(library, files) {
  const cursor = MediaItem.find({ library: library._id }).cursor()

  while (true) {
    const mediaItem = await cursor.next()
    if (!mediaItem) break

    if (!files.includes(mediaItem.path)) {
      // remove media item
      console.log('Removing due to missing/ignored file', mediaItem.path)
      await cleanThumbnails(mediaItem)
      await mediaItem.remove()
    }
  }
}

function checkIfIgnored(filePath, ignorePatterns) {
  for (const pattern of ignorePatterns) {
    if (filePath.match(new RegExp(pattern))) {
      return true
    }
  }

  return false
}
