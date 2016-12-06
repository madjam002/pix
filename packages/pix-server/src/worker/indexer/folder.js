import path from 'path'
import {getLock} from 'service/lock'
import Folder from '../../models/folder'

export async function ensureFoldersForPath(folderPath, libraryId) {
  if (folderPath === '.') {
    // root folder
    return null
  }

  const name = path.basename(folderPath)

  const parentFolderPath = path.dirname(folderPath)
  const parentFolder = await ensureFoldersForPath(parentFolderPath, libraryId)

  const existingFolder = await Folder.findOne({ path: folderPath, library: libraryId })

  if (!existingFolder) {
    // create folder with lock to prevent it being added twice across multiple worker threads
    const lock = await getLock()
    await lock.acquire(`indexer:folder:${folderPath}`)

    const folder = await Folder.findOneAndUpdate(
      { path: folderPath, library: libraryId },
      {
        path: folderPath,
        library: libraryId,
        name,
        parent: parentFolder != null ? parentFolder._id : null,
      },
      { upsert: true, new: true },
    )

    await lock.release()

    return folder
  }

  if (!existingFolder.nameLower) {
    existingFolder.nameLower = existingFolder.name.toLowerCase()
  }

  if (existingFolder.isModified()) {
    console.log('Updating folder', folderPath)
    await existingFolder.save()
  }

  return existingFolder
}

export async function ensureFoldersHaveCover(mediaItem, folderPath, libraryId) {
  if (folderPath === '.') {
    // root folder
    return null
  }

  const parentFolderPath = path.dirname(folderPath)
  await ensureFoldersHaveCover(mediaItem, parentFolderPath, libraryId)

  const folder = await Folder.findOne({ path: folderPath, library: libraryId })

  if (folder != null && folder.cover == null) {
    folder.cover = mediaItem._id
    await folder.save()
  }
}
