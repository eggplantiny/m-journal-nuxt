const functions = require('firebase-functions')
const express = require('../express')
const firebaseModules = require('../utils/firebaseModule')

const app = express()
const fb = firebaseModules()

const runtimeOptions = {
  timeoutSeconds: 30,
  memory: '128MB'
}

app.get('/', async (req, res) => {
  const text = req.query.text
  const { id } = await fb.store.collection('messages').add({
    message: text
  })

  return res.json({ id })
})

const handler = functions
  .region('asia-northeast1')
  .runWith(runtimeOptions)
  .https
  .onRequest(app)

module.exports = handler
