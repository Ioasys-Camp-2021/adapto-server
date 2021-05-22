const { ResetToken } = require('../models')

module.exports = {
  get: (params) => ResetToken.findOne({ where: params }),
  create: (params) => ResetToken.create(params),
  update: (resetToken) => resetToken.save(),
  destroy: (id) => ResetToken.destroy({ where: { id } })
}
