const fm = require('../../utils/firebaseModule')()

async function addUser (user) {
  const { uid, name, email, picture } = user
  const doc = fm.store.collection('users').doc(uid)

  await doc.set({
    createdAt: new Date(),
    nickName: 'Hello World',
    name,
    email,
    picture,
    verified: true,
    uid
  })
  return uid
}

async function checkUser (user) {
  const { uid } = user
  const userRef = fm.store.collection('users').doc(uid)
  const userDoc = await userRef.get()

  return userDoc.exists
}

module.exports = {
  addUser,
  checkUser
}

