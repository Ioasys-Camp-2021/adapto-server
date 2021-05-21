const { createUser } = require('./create.service')
const { list } = require('./list.service')
const { get } = require('./get.service')
const { update } = require('./update.service')

module.exports = {
  createUser,
  list,
  get,
  update
}
