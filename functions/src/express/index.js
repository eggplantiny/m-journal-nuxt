import * as cors from 'cors'
import * as express from 'express'
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')()
const morgan = require('morgan')
const consola = require('consola')

const routes = require('./routes')

function generateApp () {

  const app = express()

  app.use(cors({ origin: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser)
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

  routes.forEach(({ name, router }) => app.use(`/${name}`, router))

  consola.ready({
    message: `Server listening`,
    badge: true
  })

  return app
}

export default

