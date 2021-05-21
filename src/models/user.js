const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')
const { encryptor } = require('../utils')

class User extends Model {}
User.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      field: 'role_id'
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      set (value) {
        this.setDataValue('firstName', value.replace(/\b\w/g, l => l.toUpperCase()))
      }
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name',
      set (value) {
        this.setDataValue('lastName', value.replace(/\b\w/g, l => l.toUpperCase()))
      }
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.firstName} ${this.lastName}`
      }
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'User',
    tableName: 'users',
    paranoid: true
  }
)

User.beforeSave(async (user, options) => {
  const password = await encryptor.hashPassword(user.password)
  if (user.changed('password')) {
    Object.assign(user, { password })
  }
  return user
})

User.prototype.toJSON = function () {
  const user = { ...this.get() }
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !['password'].includes(key))
  )
}

module.exports = User
