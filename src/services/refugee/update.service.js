const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { refugeesRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  console.log(id)
  const refugee = await refugeesRepository.get({ userId: id })

  if (!refugee) {
    throw Object.assign(new Error(messages.notFound('refugee')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter a valid url'
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

  Object.keys(validated).forEach((key) => {
    refugee.setDataValue(key, validated[key])
  })

  const refugeeUpdated = await refugeesRepository.update(refugee)

  return {
    id: refugeeUpdated.id,
    userId: refugeeUpdated.userId,
    brazilStateId: refugeeUpdated.brazilStateId,
    bio: refugeeUpdated.bio,
    phone: refugeeUpdated.phone,
    website: refugeeUpdated.website,
    linkedin: refugeeUpdated.linkedin,
    facebook: refugeeUpdated.facebook,
    instagram: refugeeUpdated.instagram
  }
}
