const admin = require('firebase-admin')
const cert = require('../skey.json')

function firebaseModuleClosure () {
  admin.initializeApp({
    credential: admin.credential.cert(cert)
  })

  const bucket = admin.storage().bucket()
  const store = admin.firestore()
  const increment = admin.firestore.FieldValue.increment

  return () => {
    return {
      bucket,
      store,
      increment
    }
  }
}

const firebaseModule = firebaseModuleClosure()

module.exports = firebaseModule
