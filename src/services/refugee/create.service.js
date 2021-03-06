const yup = require('yup')
const { createUser } = require('../user/create.service')
const { refugeesRepository } = require('../../repositories')
const { User } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const regexUrl = {
    regex: /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    msg: 'Enter'
  }

  const schema = yup.object().shape({
    title: yup.string(),
    bio: yup.string(),
    location: yup.string(),
    languages: yup.string(),
    contact: yup.string().email(),
    job_modality: yup.string(),
    work_experiences: yup.string().max(500),
    website: yup.string().matches(regexUrl.regex, regexUrl.msg),
    linkedin: yup.string().matches(regexUrl.regex, regexUrl.msg),
    facebook: yup.string().matches(regexUrl.regex, regexUrl.msg),
    instagram: yup.string().matches(regexUrl.regex, regexUrl.msg)
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const user = await createUser(body, 1)

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

  return await refugeesRepository.getAll({
    where: {
      id: refugeeCreated.id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    }]
  })
}
