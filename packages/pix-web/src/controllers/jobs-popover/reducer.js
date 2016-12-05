import * as actions from './actions'

const initialState = {
  jobs: [],
}

const ensureJob = (jobs, newJob) => {
  if (jobs.find(job => job.id === newJob.id)) {
    return [
      ...jobs.map(job => {
        if (job.id === newJob.id) {
          return { ...job, ...newJob }
        }

        return job
      }),
    ]
  }

  return [
    ...jobs,
    newJob,
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.JOB_CREATE:
      return {
        ...state,
        jobs: ensureJob(state.jobs, action.job),
      }

    case actions.JOB_PROGRESS:
      return {
        ...state,
        jobs: ensureJob(state.jobs, action.job),
      }

    case actions.JOB_COMPLETE:
      return {
        ...state,
        jobs: state.jobs.filter(job => job.id !== action.job.id),
      }

    default:
      return state
  }
}
