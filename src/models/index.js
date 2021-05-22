const Sequelize = require('sequelize')
const config = require('../config/database/sequelize')
const User = require('./user')
const Role = require('./role')
const BrazilState = require('./brazilstates')
const Refugee = require('./refugee')
const ResetToken = require('./resettoken')

Role.hasMany(User)
User.hasOne(Role)

BrazilState.hasMany(Refugee)

Refugee.hasOne(BrazilState)
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
  BrazilState,
  Refugee,
  ResetToken
}
