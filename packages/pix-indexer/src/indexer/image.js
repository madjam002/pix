import chroma from 'chroma-js'
import fs from 'fs-promise'
import path from 'path'
import sharp from 'sharp'
import config from '../config'
import mkdirp from 'mkdirp-promise'
import ColorThief from './color-thief'

const SIZE_MAP = {
  small: 150,
  medium: 350,
}

const colorThief = new ColorThief()

export async function genImageColour(fullPath) {
  const color = colorThief.getColor(fullPath)

  return chroma(color).hex()
}

export async function genThumbnail(fullPath, mediaItem, size) {
  await mkdirp(path.join(config.dataPath, 'thumbnails'))
  const thumbPath = path.join(config.dataPath, 'thumbnails', `${mediaItem._id.toString()}_${size}.jpg`)

  let thumbWidth, thumbHeight

  if (mediaItem.width > mediaItem.height) {
    thumbHeight = SIZE_MAP[size]
  } else {
    thumbWidth = SIZE_MAP[size]
  }

  if (!await fs.exists(thumbPath)) {
    try {
      const thumb = await sharp(fullPath)
      .rotate()
      .resize(thumbWidth, thumbHeight)
      .toFile(thumbPath)

      console.log('Generated thumbnail for', mediaItem.path)

      return thumb
    } catch (ex) {
      console.log('Failed generating thumbnail', mediaItem.path, ex.message)
    }
  }
}

export async function cleanThumbnails(mediaItem) {
  await removeThumbnail(mediaItem, 'small')
  await removeThumbnail(mediaItem, 'medium')
  console.log('Removed thumbnails for', mediaItem.path)
}

export async function removeThumbnail(mediaItem, size) {
  const thumbPath = path.join(config.dataPath, 'thumbnails', `${mediaItem._id.toString()}_${size}.jpg`)
  await fs.unlink(thumbPath)
}
