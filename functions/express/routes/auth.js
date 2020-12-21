const express = require('express')
const userController = require('../controller/user')
const authController = require('../controller/auth')

const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

router.post('/SignUp',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const result = await userController.addUser(user)
    return res.json(result)
  })

router.get('/CheckUser',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const result = await authController.checkUser(user)
    return res.json(result)
  })

module.exports = router
