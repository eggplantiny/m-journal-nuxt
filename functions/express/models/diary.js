const fm = require('../../firebaseModule')

const collection = fm.store.collection('users')

async function fetchItem (user) {
  const { uid } = user

  const snapshots = await collection.doc(uid).collection('diary').get()
  const items = []
  snapshots.forEach(doc => {
    const item = doc.data()
    const id = doc.id
    items.push({
      ...item,
      id
    })
  })
  return items
}

async function addItem (user, title, description, startTime, dateString, hashtags) {
  const { uid } = user

  const { id } = await collection.doc(uid).collection('diary').add({
    title,
    description,
    startTime,
    dateString,
    hashtags
  })

  return id
}

async function deleteItem (user, did) {
  const { uid } = user
  await collection.doc(uid).collection('diary').doc(did).delete()
}

module.exports = {
  fetchItem,
  addItem,
  deleteItem
}

