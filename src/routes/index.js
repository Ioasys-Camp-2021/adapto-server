const { auth } = require('./auth.routes')
const { user } = require('./user.routes')
const { refugee } = require('./refugee.routes')
const { category } = require('./category.routes')

module.exports = {
  auth,
  user,
  refugee,
  category
}
