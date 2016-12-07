import {GraphQLObjectType, GraphQLString, GraphQLFloat} from 'graphql'
import _ from 'lodash'

const get = _.get

const coordinates = exifGps => {
  let lat = exifGps.GPSLatitude
  let lon = exifGps.GPSLongitude

  const latRef = exifGps.GPSLatitudeRef || 'N'
  const lonRef = exifGps.GPSLongitudeRef || 'W'
  lat = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === 'N' ? 1 : -1)
  lon = (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === 'W' ? -1 : 1)

  return { lat, lon }
}

const flashLabels = {
  0x0000: 'Flash did not fire',
  0x0001: 'Flash fired',
  0x0005: 'Strobe return light not detected',
  0x0007: 'Strobe return light detected',
  0x0009: 'Flash fired, compulsory flash mode',
  0x000D: 'Flash fired, compulsory flash mode, return light not detected',
  0x000F: 'Flash fired, compulsory flash mode, return light detected',
  0x0010: 'Flash did not fire, compulsory flash mode',
  0x0018: 'Flash did not fire, auto mode',
  0x0019: 'Flash fired, auto mode',
  0x001D: 'Flash fired, auto mode, return light not detected',
  0x001F: 'Flash fired, auto mode, return light detected',
  0x0020: 'No flash function',
  0x0041: 'Flash fired, red-eye reduction mode',
  0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
  0x0047: 'Flash fired, red-eye reduction mode, return light detected',
  0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
  0x004D: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
  0x004F: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
  0x0059: 'Flash fired, auto mode, red-eye reduction mode',
  0x005D: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
  0x005F: 'Flash fired, auto mode, return light detected, red-eye reduction mode',
}

const ExifType = new GraphQLObjectType({
  name: 'Exif',

  fields: () => ({
    camera: {
      type: GraphQLString,
      resolve: exif => get(exif, 'image.Make'),
    },
    cameraModel: {
      type: GraphQLString,
      resolve: exif => get(exif, 'image.Model'),
    },
    latitude: {
      type: GraphQLFloat,
      resolve: exif => exif.gps != null && exif.gps.GPSLatitude != null ? coordinates(exif.gps).lat : null,
    },
    longitude: {
      type: GraphQLFloat,
      resolve: exif => exif.gps != null && exif.gps.GPSLongitude != null ? coordinates(exif.gps).lon : null,
    },
    flash: {
      type: GraphQLString,
      resolve: exif => exif.exif != null && exif.exif.Flash != null ? flashLabels[exif.exif.Flash] : null,
    },
  }),
})

export default ExifType
