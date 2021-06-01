const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Image extends Model {}
Image.init(
  {
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    key: DataTypes.STRING,
    url: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Image',
    tableName: 'images',
    paranoid: true
  }
)

module.exports = Image
