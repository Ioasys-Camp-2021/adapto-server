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
    brazilStateId: refugee.brazilStateId,
    bio: refugee.bio,
    phone: refugee.phone,
    website: refugee.website,
    linkedin: refugee.linkedin,
    facebook: refugee.facebook,
    instagram: refugee.instagram
  }
}
