const { StatusCodes } = require('http-status-codes')
const { projectsRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const project = await projectsRepository.getById(id)

  if (!project) {
    throw Object.assign(new Error(messages.notFound('project')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return {
    id: project.id,
    title: project.title,
    description: project.description
  }
}
