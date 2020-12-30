const express = require('express')

const Diary = require('../models/diary')

const response = require('../helper/response')
const router = express.Router()

const validateFirebaseIdToken = require('../middleware/firebaseAuth')

router.get('/',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user

    let items = []
    try {
      items = await Diary.fetchItem(user)
    } catch (e) {
      return response.failed(res, e)
    }
    return response.success(res, items)
  })

router.post('/',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const { title, description, startTime, dateString, hashtags } = req.body

    if (!title) {
      return response.errorHandler.needParameter(res, 'title')
    }

    if (!startTime) {
      return response.errorHandler.needParameter(res, 'startTime')
    }

    if (!dateString) {
      return response.errorHandler.needParameter(res, 'dateString')
    }

    const did = await Diary.addItem(user, title, description || '', startTime, dateString, hashtags || [])
    return response.success(res, did)
  })

router.delete('/:did',
  [validateFirebaseIdToken],
  async (req, res) => {
    const user = req.user
    const { did } = req.params
    try {
      await Diary.deleteItem(user, did)
    } catch (e) {
      return response.failed(req, e)
    }

    return response.success(res, null)
  })

module.exports = {
  name: 'diary',
  router
}
