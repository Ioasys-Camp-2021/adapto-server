const { StatusCodes } = require('http-status-codes')
const { User, Project } = require('../../models')
const { refugeesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const refugee = await refugeesRepository.getAll({
    where: {
      userId: id
    },
    attributes: { exclude: ['deletedAt', 'UserId'] },
    include: [{
      model: User,
      attributes: ['id', 'fullName', 'firstName', 'email']
    },
    {
      model: Project,
      attributes: { exclude: ['deletedAt', 'RefugeeId', 'UserId', 'CategoryId'] }
    }]
  })

  if (!refugee) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return refugee
}
