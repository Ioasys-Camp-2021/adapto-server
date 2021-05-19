'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        first_name: 'Adminisitrador',
        last_name: 'Adapto',
        email: 'admin@ioasys.com',
        password:
          '$2y$08$YWAoZlYAGuPzcl5hqAu.w.BZ.TYsxjNLBz6uuqJxrYEqinfSsBaEG ',
        user_type: 'none',
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
