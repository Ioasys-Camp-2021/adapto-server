const { Op } = require('sequelize')
const { refugeesRepository } = require('../../repositories')
const { User } = require('../../models')

module.exports.list = async (query) => {
  const search = query.search ? query.search : ''

  const { count, rows } = await refugeesRepository.list({
    include: [
      {
        model: User,
        where: {
          fullName: {
            [Op.iLike]: `%${search}%`
          }
        },
        attributes: ['id', 'fullName', 'firstName']
      }
    ],
    attributes: { exclude: ['deletedAt', 'UserId'] },
    order: [['createdAt', 'DESC']]
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
