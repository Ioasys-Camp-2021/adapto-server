const yup = require('yup')
const { createUser } = require('../user/create.service')
const { refugeesRepository } = require('../../repositories')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const user = await createUser(body, 1)
  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter'
  }

  const schema = yup.object().shape({
    brazilStateId: yup.number(),
    bio: yup.string(),
    phone: yup.string().max(11),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg),
    linkedin: yup.string().matches(regexUrl.regex, regexUrl.msg),
    facebook: yup.string().matches(regexUrl.regex, regexUrl.msg),
    instagram: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const refugee = await refugeesRepository.get(
    {
      userId: user.id
    },
    { paranoid: false }
  )

  if (refugee) {
    throw Object.assign(new Error(messages.alreadyExists('user')), {
      status: StatusCodes.CONFLICT
    })
  }

  const refugeeCreated = await refugeesRepository.create({
    userId: user.id,
    ...validated
  })

  return {
    id: refugeeCreated.id,
    userId: refugeeCreated.userId,
    fullName: user.fullName,
    email: user.email,
    brazilStateId: refugeeCreated.brazilStateId,
    bio: refugeeCreated.bio,
    phone: refugeeCreated.phone,
    website: refugeeCreated.website,
    linkedin: refugeeCreated.linkedin,
    facebook: refugeeCreated.facebook,
    instagram: refugeeCreated.instagram
  }
}
