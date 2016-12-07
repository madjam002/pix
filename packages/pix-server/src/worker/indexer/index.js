import glob from 'glob-promise'
import path from 'path'
import Library from 'models/library'
import kue from 'service/kue'
import Bluebird from 'bluebird'
import Folder from 'models/folder'
import MediaItem from 'models/media-item'

export default async function indexLibrary(libraryId, job) {
  const library = await Library.findById(libraryId)
  const libraryPath = library.path

  console.log('Indexing', libraryPath)

  const files = await glob('**/*.*', { cwd: libraryPath })

  console.log('Got', files.length, 'photos')

  let numComplete = 0
  const total = files.length

  await Bluebird.map(files, async file => {
    const fullPath = path.join(libraryPath, file)
    const name = path.basename(file, path.extname(file))

    const itemJob = await kue.create('library:process:item', { name, file, path: fullPath, libraryId, ignorePatterns: library.ignorePatterns })
    await itemJob.saveAsync()

    await new Promise(resolve => {
      itemJob.once('complete', resolve)
      itemJob.once('failed', resolve)
    })

    job.progress(++numComplete, total, { currentName: file })
    console.log('Complete', numComplete, 'left', total - numComplete)
  }, { concurrency: 100 })

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
