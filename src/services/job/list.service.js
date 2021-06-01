const { Op } = require('sequelize')
const { jobsRepository } = require('../../repositories')
const { Category, User, Enterprise } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : ''
  const category = query.category ? query.category : ''
  const page = query.page ? query.page * 7 : 0

  const { count, rows } = await jobsRepository.list({
    include: [{
      model: User,
      attributes: ['id', 'fullName']
    },
    {
      model: Enterprise,
      attributes: ['id', 'bio', 'website']
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
    attributes: { exclude: ['deletedAt', 'UserId', 'EnterpriseId', 'CategoryId'] },
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
