"use strict";
const express = require('express');
const Diary = require('../models/diary');
const response = require('../helper/response');
const router = express.Router();
const validateFirebaseIdToken = require('../middleware/firebaseAuth');
router.get('/', [validateFirebaseIdToken], async (req, res) => {
    const user = req.user;
    let items = [];
    try {
        items = await Diary.fetchItem(user);
    }
    catch (e) {
        return response.failed(res, e);
    }
    return response.success(res, items);
});
router.post('/', [validateFirebaseIdToken], async (req, res) => {
    const user = req.user;
    const { title, description, startAt, dateString, hashtags, color, mediaUrls } = req.body;
    if (!title) {
        return response.errorHandler.needParameter(res, 'title');
    }
    if (!startAt) {
        return response.errorHandler.needParameter(res, 'startAt');
    }
    if (!dateString) {
        return response.errorHandler.needParameter(res, 'dateString');
    }
    if (!color) {
        return response.errorHandler.needParameter(res, 'color');
    }
    const diaryId = await Diary.addItem(user, title, startAt, dateString, color, description || '', hashtags || [], mediaUrls || []);
    return response.success(res, diaryId);
});
router.delete('/:diaryId', [validateFirebaseIdToken], async (req, res) => {
    const user = req.user;
    const { diaryId } = req.params;
    try {
        await Diary.deleteItem(user, diaryId);
    }
    catch (e) {
        return response.failed(req, e);
    }
    return response.success(res, null);
});
module.exports = {
    name: 'diary',
    router
};
//# sourceMappingURL=diary.js.map