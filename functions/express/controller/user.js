const fm = require('../../firebaseModule')

async function addUser (user, nickName, color, dark) {
  const { uid, name, email, picture } = user
  const doc = fm.store.collection('users').doc(uid)

  await doc.set({
    createdAt: new Date(),
    nickName,
    color,
    dark,
    name,
    email,
    picture,
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

