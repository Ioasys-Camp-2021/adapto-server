const Sequelize = require('sequelize')
const config = require('../config/database/sequelize')
const User = require('./user')
const Role = require('./role')
const Refugee = require('./refugee')
const ResetToken = require('./resettoken')
const Category = require('./category')

Role.hasMany(User)
User.hasOne(Role)
Refugee.belongsTo(User)

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
  Category
}
