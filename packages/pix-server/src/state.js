import fs from 'fs-promise'
import path from 'path'
import config from './config'

const statePath = path.join(config.dataPath, 'app.json')

export async function getState() {
  return JSON.parse(await fs.readFile(statePath))
}

export async function writeState(state) {
  const oldState = await getState()

  await fs.writeFile(statePath, JSON.stringify({ ...oldState, ...state }))
}
