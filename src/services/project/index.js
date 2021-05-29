const { create } = require('./create.service')
const { get } = require('./get.service')
const { update } = require('./update.service')
const { deleteOne } = require('./delete.service')

module.exports = {
  create,
  get,
  update,
  deleteOne
}
