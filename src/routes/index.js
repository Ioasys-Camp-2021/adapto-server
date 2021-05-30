const { auth } = require('./auth.routes')
const { user } = require('./user.routes')
const { refugee } = require('./refugee.routes')
const { category } = require('./category.routes')
const { project } = require('./project.routes')
const { enterprise } = require('./enterprise.routes')

module.exports = {
  auth,
  user,
  refugee,
  category,
  project,
  enterprise
}
