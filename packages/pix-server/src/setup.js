import mkdirp from 'mkdirp-promise'
import fs from 'fs-promise'
import path from 'path'
import config from './config'

const initialAppState = {
  firstRun: true,
}

export default async function () {
  await mkdirp(config.dataPath)

  if (!await fs.exists(path.join(config.dataPath, 'app.json'))) {
    await fs.writeFile(path.join(config.dataPath, 'app.json'), JSON.stringify(initialAppState))
  }
}
