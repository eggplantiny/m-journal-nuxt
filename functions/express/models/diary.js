const fm = require('../../firebaseModule')

async function addItem (user, title, description, startTime, dateString, hashtags) {
  const { uid } = user

  const { id } = await fm.store.collection('users').doc(uid).collection('diary').add({
    title,
    description,
    startTime,
    dateString,
    hashtags
  })

  return id
}

module.exports = {
  addItem
}

