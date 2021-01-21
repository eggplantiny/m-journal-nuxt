"use strict";
const express = require('express');
const User = require('../models/user');
const response = require('../helper/response');
const router = express.Router();
const validateFirebaseIdToken = require('../middleware/firebaseAuth');
router.post('/SignUp', [validateFirebaseIdToken], async (req, res) => {
    const user = req.user;
    const { nickName, color, dark, detail } = req.body;
    if (nickName === undefined) {
        return response.errorHandler.needParameter(res, 'nickName');
    }
    const uid = await User.addUser(user, nickName);
    return response.success(res, { uid });
});
router.get('/CheckUser', [validateFirebaseIdToken], async (req, res) => {
    const user = req.user;
    const { exists, userInfo } = await User.checkUser(user);
    return response.success(res, { exists, userInfo });
});
module.exports = {
    name: 'auth',
    router
};
//# sourceMappingURL=auth.js.map