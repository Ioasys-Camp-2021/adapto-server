const { createUser } = require('../user/create.service')

module.exports.create = async (body) => {
  const user = await createUser(body, 1)

  return user
}