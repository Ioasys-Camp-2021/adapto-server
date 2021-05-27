const yup = require('yup')
const { StatusCodes } = require('http-status-codes')
const { messages } = require('../../utils')
const { categoriesRepository } = require('../../repositories')

module.exports.update = async (id, body) => {
  const category = await categoriesRepository.getById(id)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  const schema = yup.object().shape({
    title: yup.string()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })
  category.setDataValue('title', validated.title)

  const categoryUpdated = await categoriesRepository.update(category)

  return {
    id: categoryUpdated.id,
    title: categoryUpdated.title
  }
}
