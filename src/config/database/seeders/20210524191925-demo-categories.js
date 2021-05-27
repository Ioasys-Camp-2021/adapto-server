'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        title: 'Tecnologia',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Educação',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Culinária',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  }
}
