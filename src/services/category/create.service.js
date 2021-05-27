const yup = require('yup')
const { Op } = require('sequelize')
const { StatusCodes } = require('http-status-codes')
const { categoriesRepository } = require('../../repositories')
const { messages } = require('../../utils')

module.exports.create = async (body) => {
  const schema = yup.object().shape({
    title: yup.string().required()
  })

  const validated = await schema.validate(body, {
    stripUnknown: true
  })

  const category = await categoriesRepository.get({
    title: { [Op.iLike]: validated.title }
  })

  if (category) {
    throw Object.assign(new Error(messages.alreadyExists('category')), {
      status: StatusCodes.CONFLICT
    })
  }

  const categoryCreated = await categoriesRepository.create(validated)

  return {
    id: categoryCreated.id,
    title: categoryCreated.title
  }
}
