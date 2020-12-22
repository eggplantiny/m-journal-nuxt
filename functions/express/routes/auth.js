const express = require('express')
const userController = require('../controller/user')
const authController = require('../controller/auth')

const response = require('../utils/response')

const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

router.post('/SignUp',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const { nickName, color, dark } = req.body

    if (nickName === undefined) {
      return response.errorHandler.needParameter(res, 'nickName')
    }

    if (color === undefined) {
      return response.errorHandler.needParameter(res, 'color')
    }

    if (dark === undefined) {
      return response.errorHandler.needParameter(res, 'dark')
    }

    const uid = await userController.addUser(user, nickName, color, dark)
    return response.success(res, { uid })
  })

router.get('/CheckUser',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const result = await authController.checkUser(user)
    return response.success(res, result)
  })

module.exports = router
