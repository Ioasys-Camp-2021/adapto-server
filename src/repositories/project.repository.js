const { Project } = require('../models')

module.exports = {
  list: (query) => Project.findAndCountAll(query),
  getById: (id) => Project.findByPk(id),
  get: (params) => Project.findOne({ where: params }),
  create: (params) => Project.create(params),
  update: (project) => project.save(),
  destroy: (id) => Project.destroy({ where: { id } })
}
