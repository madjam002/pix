import socket from 'core/socket'
import store from '../../store'

export const JOB_CREATE = 'JOB_CREATE'
export const JOB_PROGRESS = 'JOB_PROGRESS'
export const JOB_COMPLETE = 'JOB_COMPLETE'

export const jobCreate = job => ({
  type: JOB_CREATE,
  job,
})

export const jobProgress = job => ({
  type: JOB_PROGRESS,
  job,
})

export const jobComplete = job => ({
  type: JOB_COMPLETE,
  job,
})

socket.on('job:create', job => store.dispatch(jobCreate(job)))
socket.on('job:progress', job => store.dispatch(jobProgress(job)))
socket.on('job:complete', job => store.dispatch(jobComplete(job)))
