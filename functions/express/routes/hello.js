const express = require('express')
const router = express.Router()

const response = require('../utils/response')
const validateFirebaseIdToken = require('../middleware/firebaseAuth')

router.get('/World',
  async (req, res) => {
  return response.success(res, { hello: 'Hello World!' })
})

router.get('/Who',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    return response.success(res, { user })
})

module.exports = router
