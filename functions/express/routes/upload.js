
const express = require('express')
const response = require('../helper/response')

const fileUpload = require('express-fileupload')

const {
  uploadFile
} = require('../controller/upload')

const consola = require('consola')

const {
  makeOriginal,
  makeThumbnail
} = require('../helper/imageHandler')

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

const router = express.Router()

router.post('/',
  // [validateFirebaseIdToken],
  [],
  async (req, res) => {
    //  Validation Parameters
    consola.info(req.files)
    if (!req.files || !req.files.image) {
      return response.failed(res, { message: 'No image were uploaded' })
    }

    const image = req.files.image
    const { mimetype, data } = image

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return response.failed(res, { message: 'Invalid file type, only JPEG and PNG is allowed!' })
    }

    //  Image Preprocessing
    let buffers = null
    try {
      const [original, thumbnail] = await Promise.all([
        makeOriginal(data),
        makeThumbnail(data)
      ])
      buffers = {
        thumbnail,
        original
      }
    } catch (e) {
      consola.error(e)
      return response.failed(res, { message: e })
    }

    //  upload to S3
    const timestamp = Date.now().toString(10)
    const originalKey = `original_${timestamp}.jpg`
    const thumbnailKey = `thumbnail_${timestamp}.jpg`

    let result
    try {
      result = await Promise.all([
        uploadFile(buffers.original, originalKey, 'original'),
        uploadFile(buffers.thumbnail, thumbnailKey, 'thumbnail')
      ])
    } catch (e) {
      consola.error(e)
      return response.failed(res, e)
    }

    const imageUrls = result.map(item => item.Location)

    consola.info('Image uploaded successfully on S3')
    imageUrls.forEach(url => consola.info(`> ${url}`))

    return response.success(res, result)
  })

module.exports = {
  name: 'upload',
  router
}
