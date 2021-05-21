const { createUser } = require('./create.service')
const { list } = require('./list.service')
const { get } = require('./get.service')
const { update } = require('./update.service')
const { deleteUser } = require('./delete.service')

module.exports = {
  createUser,
  list,
  get,
  update,
  deleteUser
}
