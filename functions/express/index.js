const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')()

const routes = require('./routes')

// const validateFirebaseIdToken = require('./middleware/firebaseAuth')

function generateApp () {
  const app = express()

  app.use(cors({ origin: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser)
  // app.use(validateFirebaseIdToken)

  routes.forEach(({ path, router }) => {
    app.use(`/${path}`, router)
  })

  return app
}

module.exports = generateApp
