const fm = require('../../utils/firebaseModule')()

async function addUser (user) {
  const { uid } = user
  const doc = fm.store.collection('users').doc(uid)
  await doc.collection('schedules').add({
    items: [],
    status: 'Hello World'
  })
  return doc
}

module.exports = {
  addUser
}

