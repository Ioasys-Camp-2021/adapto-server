const { Op } = require('sequelize')
const { projectsRepository } = require('../../repositories')
const { Category, User } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : ''
  const category = query.category ? query.category : ''
  const page = query.page ? query.page * 7 : 0

  const { count, rows } = await projectsRepository.list({
    include: [{
      model: User,
      attributes: ['id', 'fullName']
    },
    {
      model: Category,
      attributes: ['id', 'title'],
      where: {
        title: {
          [Op.iLike]: `%${category}%`
        }
      }
    }],
    attributes: ['id', 'refugeeId', 'title', 'description', 'createdAt'],
    where: {
      [Op.or]: [
        {
          title: {
            [Op.iLike]: `%${search}%`
          }
        },
        {
          description: {
            [Op.iLike]: `%${search}%`
          }
        }
      ]
    },
    order: [['createdAt', 'DESC']],
    limit: 7,
    offset: page
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
