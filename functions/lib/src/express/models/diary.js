"use strict";
const fm = require('../../../firebaseModule');
const moment = require('moment');
const collection = fm.store.collection('users');
async function fetchItem(user) {
    const { uid } = user;
    const snapshots = await collection.doc(uid).collection('diary').get();
    const items = [];
    snapshots.forEach(doc => {
        const item = doc.data();
        const diaryId = doc.id;
        item.diaryId = diaryId;
        items.push(item);
    });
    return items;
}
async function addItem(user, title, startAt, dateString, color, description, hashtags, mediaUrls) {
    const { uid } = user;
    const createdAt = Date.now();
    const modifiedAt = null;
    const { id } = await collection.doc(uid).collection('diary').add({
        title,
        description,
        dateString,
        hashtags,
        color,
        startAt,
        mediaUrls,
        createdAt,
        modifiedAt
    });
    return id;
}
async function deleteItem(user, diaryId) {
    const { uid } = user;
    await collection.doc(uid).collection('diary').doc(diaryId).delete();
}
module.exports = {
    fetchItem,
    addItem,
    deleteItem
};
//# sourceMappingURL=diary.js.map