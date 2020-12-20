const hello = require('./hello')
const auth = require('./auth')

module.exports = [
  { path: 'hello',  router: hello },
  { path: 'auth',   router: auth  }
]
