const express = require('express')

const settingModel = require('../models/setting')

const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')
const response = require('../helper/response')

router.get('/',
  [validateFirebaseIdToken],
  async (req, res) => {
    const { user } = req
    try {
      const setting = await settingModel.getItem(user)
      response.success(res, setting)
    } catch (e) {
      console.error(e)
      response.failed(res, e)
    }
  })

router.put('/',
  [validateFirebaseIdToken],
  async (req, res) => {
    const { user } = req
    const { dark, detail, color, nickName } = req.body

    if (dark === undefined) {
      return response.errorHandler.needParameter(res, 'dark')
    }

    if (detail === undefined) {
      return response.errorHandler.needParameter(res, 'detail')
    }

    if (color === undefined) {
      return response.errorHandler.needParameter(res, 'color')
    }

    if (nickName === undefined) {
      return response.errorHandler.needParameter(res, 'nickName')
    }

    try {
      await settingModel.updateItem(user, nickName, dark, detail, color)
      response.success(res)
    } catch (e) {
      console.error(e)
      response.failed(res, e)
    }
  })

module.exports = {
  name: 'setting',
  router
}
