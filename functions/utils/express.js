const cors = require('cors')
const express = require('express')

function generateApp () {
  const app = express()

  app.use(cors({ origin: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  return app
}

module.exports = generateApp
