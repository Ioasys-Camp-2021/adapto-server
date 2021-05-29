const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { refugeesRepository, projectsRepository, categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.update = async (userId, id, body) => {
  const refugee = await refugeesRepository.get({ userId: userId })
  const project = await projectsRepository.get({ id: id, refugeeId: refugee.id })

  if (!refugee || !project) {
    throw Object.assign(new Error(messages.notFound('user-or-project')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    categoryId: yup.string(),
    title: yup.string(),
    description: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  if (validated.categoryId != null) {
    const category = await categoriesRepository.getById(validated.categoryId)

    if (!category) {
      throw Object.assign(new Error(messages.notFound('category')), {
        status: StatusCodes.NOT_FOUND
      })
    }
  }

  Object.keys(validated).forEach((key) => {
    project.setDataValue(key, validated[key])
  })

  const projectUpdated = await projectsRepository.update(project)

  return {
    refugeeId: refugee.id,
    id: projectUpdated.id,
    title: projectUpdated.title,
    categoryId: projectUpdated.categoryId,
    description: projectUpdated.description
  }
}
