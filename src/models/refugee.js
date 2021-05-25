const { Model, DataTypes, Sequelize } = require('sequelize')
const config = require('../config/database/sequelize')

class Refugee extends Model {}
Refugee.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    title: DataTypes.STRING,
    bio: DataTypes.STRING,
    location: DataTypes.STRING,
    languages: DataTypes.STRING,
    contact: DataTypes.STRING,
    job_modality: DataTypes.STRING,
    work_experiences: DataTypes.STRING,
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
