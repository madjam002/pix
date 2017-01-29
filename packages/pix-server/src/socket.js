import {User} from '@pix/schema'
import kue from 'service/kue'

export default async (socket, io) => {
  const session = socket.request.session

  if (session.passport && session.passport.user) {
    socket.user = await new Promise((resolve, reject) => {
      User.deserializeUser()(session.passport.user, (err, user) => {
        if (err) {
          return reject(err)
        }

        resolve(user)
      })
    })
  }

  socket.on('library:index', async ({ libraryId }) => {
    const job = kue.create('library:index', { libraryId })
    await job.saveAsync()

    listenToJob(job, io)
  })
}

function listenToJob(job, io) {
  io.emit('job:create', { id: job.id, data: job.data })
  job.on('progress', (progress, data) => io.emit('job:progress', { id: job.id, progress, progressData: data, data: job.data }))
  job.on('complete', () => io.emit('job:complete', { id: job.id }))
}
