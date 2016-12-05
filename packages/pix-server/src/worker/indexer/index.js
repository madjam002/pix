import glob from 'glob-promise'
import path from 'path'
import Library from 'models/library'
import kue from 'service/kue'
import Bluebird from 'bluebird'

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

    const itemJob = await kue.create('library:process:item', { name, file, path: fullPath, libraryId })
    await itemJob.saveAsync()

    await new Promise(resolve => itemJob.once('complete', resolve))

    job.progress(++numComplete, total, { currentName: file })
  }, { concurrency: 100 })
}
