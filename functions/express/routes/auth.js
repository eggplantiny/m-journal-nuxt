const express = require('express')
const userController = require('../controller/user')

const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

router.get('/SignUp',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const result = await userController.addUser(user)
    return res.json(result)
  })

module.exports = router
