
const express = require('express')
// const fileUpload = require('express-fileupload')
const response = require('../helper/response')

const { filesUpload } = require('../middleware/filesUpload')

const {
  uploadFile
} = require('../models/upload')

const consola = require('consola')

const {
  makeOriginal,
  makeThumbnail
} = require('../helper/imageHandler')

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

const router = express.Router()

router.post('/',
  [
    filesUpload
  ],
  // [validateFirebaseIdToken],
  async (req, res) => {
    //  Validation Parameters
    consola.info(req.file.image)
    if (!req.file || !req.file.image) {
      return response.failed(res, { message: 'No image were uploaded' })
    }

    const image = req.file.image
    const { mimetype, buffer } = image

    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return response.failed(res, { message: 'Invalid file type, only JPEG and PNG is allowed!' })
    }

    //  Image Preprocessing
    let buffers = null
    try {
      const [original, thumbnail] = await Promise.all([
        makeOriginal(buffer),
        makeThumbnail(buffer)
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
        uploadFile(buffers.original, originalKey, 'original', mimetype),
        uploadFile(buffers.thumbnail, thumbnailKey, 'thumbnail', mimetype)
      ])
    } catch (e) {
      consola.error(e)
      return response.failed(res, e)
    }

    const imageUrls = result.map(item => item.Location)

    consola.info('Image uploaded successfully on Cloud Storage')
    imageUrls.forEach(url => consola.info(`> ${url}`))

    return response.success(res, result)
  })

module.exports = {
  name: 'upload',
  router
}
