const { StatusCodes } = require('http-status-codes')
const { refugeesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const refugee = await refugeesRepository.getById(id)

  if (!refugee) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return {
    id: refugee.id,
    userId: refugee.userId,
    title: refugee.bio,
    bio: refugee.bio,
    location: refugee.location,
    languages: refugee.languages,
    contact: refugee.contact,
    job_modality: refugee.job_modality,
    work_experiences: refugee.work_experiences,
    website: refugee.website,
    linkedin: refugee.linkedin,
    facebook: refugee.facebook,
    instagram: refugee.instagram
  }
}
