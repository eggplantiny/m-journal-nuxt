const functions = require('firebase-functions')
const express = require('./express')

const app = express()
//  Authentication 관련 정보
//  https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js

exports.app = functions.https.onRequest(app)
exports.good = functions.https.onRequest((req, res) => {
  const user = req.user
  return res.json({
    hello_world: 'Hello World!!',
    user
  })
})

