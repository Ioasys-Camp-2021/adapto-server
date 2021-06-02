const Sequelize = require('sequelize')
const config = require('../config/database/sequelize')
const User = require('./user')
const Role = require('./role')
const Refugee = require('./refugee')
const ResetToken = require('./resettoken')
const Category = require('./category')
const Project = require('./project')
const Enterprise = require('./enterprise')
const Job = require('./job')
const Image = require('./image')

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

User.hasMany(Job)
Enterprise.hasMany(Job)
Job.belongsTo(User)
Job.belongsTo(Category)
Job.belongsTo(Enterprise)

Image.belongsTo(User)

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
  Enterprise,
  Job,
  Image
}
