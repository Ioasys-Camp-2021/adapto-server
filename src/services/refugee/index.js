const { create } = require('./create.service')
const { get } = require('./get.service')
const { list } = require('./list.service')
const { update } = require('./update.service')

module.exports = {
  create,
  get,
  list,
  update
}
