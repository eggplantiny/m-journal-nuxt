"use strict";
const fm = require('../../../firebaseModule');
async function addUser(user, nickName) {
    const { uid, name, email, picture } = user;
    const doc = fm.store.collection('users').doc(uid);
    await doc.set({
        createdAt: new Date(),
        nickName,
        name,
        email,
        picture,
        uid
    });
    return uid;
}
async function checkUser(user) {
    const { uid } = user;
    const userRef = fm.store.collection('users').doc(uid);
    const userDoc = await userRef.get();
    const exists = userDoc.exists;
    const userInfo = userDoc.data();
    return {
        exists,
        userInfo
    };
}
module.exports = {
    addUser,
    checkUser
};
//# sourceMappingURL=user.js.map