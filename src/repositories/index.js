const usersRepository = require('./user.repository')
const refugeesRepository = require('./refugee.repository')
const resetTokenRepository = require('./resettoken.repository')
const categoriesRepository = require('./category.repository')
const projectsRepository = require('./project.repository')
const enterprisesRepository = require('./enterprise.repository')

module.exports = {
  usersRepository,
  refugeesRepository,
  resetTokenRepository,
  categoriesRepository,
  projectsRepository,
  enterprisesRepository
}
