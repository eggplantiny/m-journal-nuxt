const express = require('express')
const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')
const response = require('../utils/response')

router.get('/World',
  async (req, res) => {
  return response.success(res, { hello: 'Hello World!' })
})

router.get('/Who',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    return response.success(res, user)
})

module.exports = router
