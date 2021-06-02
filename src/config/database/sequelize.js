require('dotenv/config')

module.exports = {
  use_env_variable: process.env.DATABASE_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }

}
