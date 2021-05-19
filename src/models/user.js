const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class User extends Model {}
User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: {
      type: DataTypes.STRING,
      field: 'user_type'
    },
    isAdmin: {
      type: DataTypes.STRING,
      field: 'is_admin'
    }
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'User',
    tableName: 'users',
    paranoid: true
  }
)

module.exports = User
