const fm = require('../../firebaseModule')

const collection = fm.store.collection('users')

async function updateItem (user, nickName, dark, detail, color) {
  const { uid } = user
  await collection.doc(uid).update({
    nickName,
    ['setting.dark']: dark,
    ['setting.detail']: detail,
    ['setting.color']: color
  })
}

async function getItem (user) {
  const { uid } = user
  const userInfoDoc =  await collection.doc(uid).get()
  const userInfo = userInfoDoc.data()

  return userInfo['setting']
}

module.exports = {
  updateItem,
  getItem
}

