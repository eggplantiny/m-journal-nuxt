const fm = require('../../firebaseModule')

function uploadFile (file, fileKey, path, root = 'image') {
  return fm.storage().ref().child(`${root}/${path}/${fileKey}`).put(file)
}

module.exports = {
  uploadFile
}

