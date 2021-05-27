const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Project extends Model {}
Project.init(
  {
    refugeeId: {
      type: DataTypes.INTEGER,
      field: 'refugee_id'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id'
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Project',
    tableName: 'projects',
    paranoid: true
  }
)

module.exports = Project
