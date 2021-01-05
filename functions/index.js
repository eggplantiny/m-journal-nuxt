const functions = require('firebase-functions')
const express = require('./express')

const app = express()
//  Authentication 관련 정보
//  https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js

exports.api = functions.region('asia-northeast3').https.onRequest(app)
