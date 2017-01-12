import mkdirp from 'mkdirp-promise'
import config from './config'

export default async function () {
  await mkdirp(config.dataPath)
}
