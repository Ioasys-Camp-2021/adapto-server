const { Op } = require('sequelize')
const { projectsRepository } = require('../../repositories')
const { Category, User } = require('../../models')

module.exports.list = async (query) => {
  let search = ''

  if (query.search) {
    search = query.search
  }

  if (query.categoryId) {
    const { count, rows } = await projectsRepository.list({
      include: [{
        model: User,
        attributes: ['id', 'fullName']
      },
      {
        model: Category,
        attributes: ['id', 'title']
      }],
      attributes: ['id', 'refugeeId', 'title', 'description', 'createdAt'],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `${search}%`
            }
          },
          {
            description: {
              [Op.iLike]: `%${search}%`
            }
          }
        ],
        categoryId: query.categoryId
      },
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
  } else {
    const { count, rows } = await projectsRepository.list({
      include: [{
        model: User,
        attributes: ['id', 'fullName']
      },
      {
        model: Category,
        attributes: ['id', 'title']
      }],
      attributes: ['id', 'refugeeId', 'title', 'description', 'createdAt'],
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `${search}%`
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
}
