const jwt = require('jsonwebtoken')
const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const usersRepository = require('../../repositories/user.repository')
const { encryptor, messages } = require('../../utils')
const { promisify } = require('util')

module.exports.login = async (body) => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const user = await usersRepository.get({ email: validated.email })

  if (!user) {
    throw Object.assign(
      new Error(messages.notFound('user')),
      { status: StatusCodes.NOT_FOUND }
    )
  }
  const valid = await encryptor.comparePassword(validated.password, user.password)
  if (!valid) {
    throw Object.assign(
      new Error(messages.invalidPassword),
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  const payload = {
    id: user.id,
    email: user.email,
    userType: user.userType,
    isAdmin: user.isAdmin
  }

  const sign = promisify(jwt.sign)
  const token = await sign(payload, process.env.JWT_TOKEN)

  return {
    email: user.email,
    token
  }
}