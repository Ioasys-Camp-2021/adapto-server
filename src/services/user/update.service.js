const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { usersRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  const user = await usersRepository.getById(id)

  if (!user) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  Object.keys(validated).forEach((key) => {
    user.setDataValue(key, validated[key])
  })

  const userUpdated = await usersRepository.update(user)

  return {
    id: userUpdated.id,
    roleId: userUpdated.roleId,
    firstName: userUpdated.firstName,
    lastName: userUpdated.lastName,
    email: userUpdated.email
  }
}
