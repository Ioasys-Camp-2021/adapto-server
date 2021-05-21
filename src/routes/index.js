const { auth } = require('./auth.routes')
const { user } = require('./user.routes')
const { refugee } = require('./refugee.routes')

module.exports = {
  auth,
  user,
  refugee
}
