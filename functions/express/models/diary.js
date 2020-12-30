const fm = require('../../firebaseModule')
const moment = require('moment')

const collection = fm.store.collection('users')

async function fetchItem (user) {
  const { uid } = user

  const snapshots = await collection.doc(uid).collection('diary').get()
  const items = []
  snapshots.forEach(doc => {
    const item = doc.data()
    const diaryId = doc.id
    items.push({
      ...item,
      diaryId
    })
  })
  return items
}

async function addItem (user, title, description, startAt, dateString, hashtags, color) {
  const { uid } = user
  const createdAt = Date.now()
  const modifiedAt = null

  const { id } = await collection.doc(uid).collection('diary').add({
    title,
    description,
    dateString,
    hashtags,
    color,
    startAt,
    createdAt,
    modifiedAt
  })

  return id
}

async function deleteItem (user, diaryId) {
  const { uid } = user
  await collection.doc(uid).collection('diary').doc(diaryId).delete()
}

module.exports = {
  fetchItem,
  addItem,
  deleteItem
}

