const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Category extends Model {}
Category.init(
  {
    title: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Category',
    tableName: 'categories'
  }
)

module.exports = Category
