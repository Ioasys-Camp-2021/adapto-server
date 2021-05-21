const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class BrazilState extends Model {}
BrazilState.init(
  {
    name: DataTypes.STRING,
    uf: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'BrazilState',
    tableName: 'brazil_states'
  }
)

module.exports = BrazilState
