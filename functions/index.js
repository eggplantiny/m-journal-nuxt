const hello = require('./routes/hello')
const functions = require('firebase-functions')

exports.hello = hello
exports.good = functions.https.onRequest((req, res) => {
  res.send("Hello world!!");
})
