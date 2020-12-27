const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')()
// const fileUpload = require('express-fileupload')
const morgan = require('morgan')
const consola = require('consola')

const routes = require('./routes')

// const validateFirebaseIdToken = require('./middleware/firebaseAuth')

function generateApp () {

  const app = express()

  app.use(cors({ origin: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser)
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
  // app.use(fileUpload({
  //     limits: { fileSize: 50 * 1024 * 1024 }  //  50 MB
  //   }))
  // app.use(validateFirebaseIdToken)

  routes.forEach(({ name, router }) => app.use(`/${name}`, router))

  consola.ready({
    message: `Server listening`,
    badge: true
  })

  return app
}

module.exports = generateApp
