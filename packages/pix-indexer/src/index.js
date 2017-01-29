import 'babel-polyfill'
import bluebird from 'bluebird'
import mongoose from 'mongoose'
import {idFromGlobalId} from '@pix/core'
import indexLibrary from './indexer'
import processItem from './indexer/process'
import kue from 'service/kue'
import config from './config'

bluebird.promisifyAll(require('kue').Job.prototype)

mongoose.connect(config.mongoUri)

process.on('unhandledRejection', ex => {
  console.error(ex.stack)
  process.exit()
})

function wrap(fn) {
  return function (job, done) {
    fn(job).then(res => done(null, res)).catch(ex => {
      done(ex)
      console.error(ex.stack)
    })
  }
}

kue.process('library:index', wrap(async job => {
  console.log('Got index', job)
  const id = idFromGlobalId(job.data.libraryId, 'Library')

  await indexLibrary(id, job)
}))

kue.process('library:process:item', 10, wrap(async job => {
  await processItem(job.data)
}))

console.log('Ready and waiting')
