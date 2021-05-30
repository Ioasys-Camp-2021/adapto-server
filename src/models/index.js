const Sequelize = require('sequelize')
const config = require('../config/database/sequelize')
const User = require('./user')
const Role = require('./role')
const Refugee = require('./refugee')
const ResetToken = require('./resettoken')
const Category = require('./category')
const Project = require('./project')
const Enterprise = require('./enterprise')

Role.hasMany(User)
User.hasOne(Role)

User.hasOne(Refugee)
User.hasOne(Enterprise)
Refugee.belongsTo(User)
Enterprise.belongsTo(User)

User.hasMany(Project)
Refugee.hasMany(Project)
Project.belongsTo(User)
Project.belongsTo(Category)
Project.belongsTo(Refugee)

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

module.exports = {
  sequelize,
  User,
  Role,
  Refugee,
  ResetToken,
  Category,
  Project,
  Enterprise
}
