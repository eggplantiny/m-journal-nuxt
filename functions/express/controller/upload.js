const { bucket } = require('../../firebaseModule')

async function uploadFile (buffer, fileKey, path, mimeType, root = 'image') {
  const file = bucket.file(`${root}/${path}/${fileKey}`)

  try {
    await file.save(buffer, {
      metadata: { contentType: mimeType, public: true, validation: 'md5' }
    })

    const [url] = await file.getSignedUrl({ action: 'read', expires: '2999-12-31' })
    return url
  } catch (e) {
    throw e
  }
}

module.exports = {
  uploadFile
}

