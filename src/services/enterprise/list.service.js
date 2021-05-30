const { Op } = require('sequelize')
const { enterprisesRepository } = require('../../repositories')
const { User } = require('../../models')

module.exports.list = async (query) => {
  let search = ''

  if (query.search) {
    search = query.search
  }

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
    limit: 5,
    offset: 0
  })

  return {
    metadata: {
      total: count
    },
    data: rows
  }
}
