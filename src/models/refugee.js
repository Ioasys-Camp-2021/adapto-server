const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Refugee extends Model {}
Refugee.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    brazilStateId: {
      type: DataTypes.INTEGER,
      field: 'brazil_state_id'
    },
    bio: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Refugee',
    tableName: 'refugees',
    paranoid: true
  }
)

module.exports = Refugee
