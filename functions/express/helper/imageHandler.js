
const sharp = require('sharp')
const consola = require('consola')

const MAX_IMAGE_WIDTH = 1920
const THUMBNAIL_WIDTH = 200
const THUMBNAIL_HEIGHT = 200

function rotateImage (sharpObject, orientation) {
  let angle
  if (orientation === 1) {
    //  정방향
  } else if (orientation === 8) {
    angle = 270
  } else if (orientation === 3) {
    angle = 180
  } else if (orientation === 6) {
    angle = 90
  }
  return sharpObject.rotate(angle)
}

async function makeOriginal (buffer) {
  let image = sharp(buffer)
  let { width, orientation } = await image.metadata()

  if (width > MAX_IMAGE_WIDTH) {
    width = MAX_IMAGE_WIDTH
  }

  consola.info(`> [imageHandler.makeOriginal] image width : ${width}px, orientation : ${orientation}`)

  image = rotateImage(image, orientation)

  return await image.resize(width).jpeg().toBuffer()
}

async function makeThumbnail (buffer) {
  let image = sharp(buffer)
  let { width, orientation } = await image.metadata()

  consola.info(`> [imageHandler.makeThumbnail] image width : ${width}px, orientation : ${orientation}`)

  image = rotateImage(image, orientation)

  return await image.resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).jpeg().toBuffer()

}

module.exports = {
  makeOriginal,
  makeThumbnail
}
