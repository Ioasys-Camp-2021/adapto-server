const { Refugee } = require('../models')

module.exports = {
  list: (query) => Refugee.findAndCountAll(query),
  getById: (id) => Refugee.findByPk(id),
  get: (params) => Refugee.findOne({ where: params }),
  create: (params) => Refugee.create(params),
  update: (refugee) => refugee.save(),
  destroy: (id) => Refugee.destroy({ where: { id } })
}
