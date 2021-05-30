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

  return await projectsRepository.create({
    userId: id,
    refugeeId: refugee.id,
    ...validated
  })
}
