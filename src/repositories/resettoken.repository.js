const { ResetToken } = require('../models')

module.exports = {
  list: (params) => ResetToken.findAll({ where: params }),
  get: (params) => ResetToken.findOne({ where: params }),
  create: (params) => ResetToken.create(params),
  update: (params, query) => ResetToken.update(params, query),
  destroy: (id) => ResetToken.destroy({ where: { id } })
}
