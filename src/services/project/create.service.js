const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { refugeesRepository, projectsRepository, categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (id, body) => {
  const refugee = await refugeesRepository.get({ userId: id })

  if (!refugee) {
    throw Object.assign(new Error(messages.notFound('user')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    categoryId: yup.string().required(),
    title: yup.string().required(),
    description: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const category = await categoriesRepository.getById(validated.categoryId)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const projectCreated = await projectsRepository.create({
    refugeeId: refugee.id,
    ...validated
  })
  return {
    id: projectCreated.id,
    title: projectCreated.title,
    category: category.title,
    description: projectCreated.description
  }
}
