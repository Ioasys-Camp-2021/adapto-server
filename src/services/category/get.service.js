const { StatusCodes } = require('http-status-codes')
const { categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.get = async (id) => {
  const category = await categoriesRepository.getById(id)

  if (!category) {
    throw Object.assign(new Error(messages.notFound('category')), {
      status: StatusCodes.NOT_FOUND
    })
  }

  return {
    id: category.id,
    title: category.title
  }
}
