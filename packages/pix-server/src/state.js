import State from './models/state'

const initialAppState = {
  firstRun: true,
}

export async function getState() {
  return (await State.findOne({})) || initialAppState
}

export async function writeState(state) {
  await State.findOneAndUpdate({}, state, { upsert: true })
}
