export const imageSize = (meta, exif) => {
  if (exif && exif.image && exif.image.Orientation) {
    const o = exif.image.Orientation

    if (o === 8 || o === 6) {
      // portrait so invert width and height
      return { width: meta.height, height: meta.width }
    }
  }

  return { width: meta.width, height: meta.height }
}
