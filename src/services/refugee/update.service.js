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

  Object.keys(validated).forEach((key) => {
    refugee.setDataValue(key, validated[key])
  })

  const refugeeUpdated = await refugeesRepository.update(refugee)

  return {
    id: refugeeUpdated.id,
    userId: refugeeUpdated.userId,
    title: refugeeUpdated.bio,
    bio: refugeeUpdated.bio,
    location: refugeeUpdated.location,
    languages: refugeeUpdated.languages,
    contact: refugeeUpdated.contact,
    job_modality: refugeeUpdated.job_modality,
    work_experiences: refugeeUpdated.work_experiences,
    website: refugeeUpdated.website,
    linkedin: refugeeUpdated.linkedin,
    facebook: refugeeUpdated.facebook,
    instagram: refugeeUpdated.instagram
  }
}
