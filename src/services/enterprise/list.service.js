const { Op } = require('sequelize')
const { enterprisesRepository } = require('../../repositories')
const { User } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : 0
  const page = query.page ? query.page : 0

  const { count, rows } = await enterprisesRepository.list({
    include: [
      {
        model: User,
        where: {
          fullName: {
            [Op.iLike]: `%${search}%`
          }
        },
        attributes: ['id', 'fullName']
      }
    ],
    attributes: { exclude: ['deletedAt', 'UserId'] },
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
