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
  return doc
}

async function checkUser (user) {
  const { uid } = user
  const docRef = await fm.store.collection('users').select('uid').where('uid', '==', uid)
  return docRef.empty
}

module.exports = {
  addUser,
  checkUser
}

